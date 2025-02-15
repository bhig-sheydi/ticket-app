import { useState, useEffect } from "react";
import { CloudUpload } from "lucide-react";
import { supabase } from "../../supabaseConfig";
import Dialog from "./Dialog";
import { useAuthContext } from "../contexts/AuthContext";

const ProfilePictureUploader = ({ onUpload }) => {
    const { setIsGoodToGo } = useAuthContext();
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("avatar") || "");
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const storedImageUrl = localStorage.getItem("avatar") || "";
        setIsGoodToGo(storedImageUrl.length > 0);
    }, [setIsGoodToGo]);

    useEffect(() => {
        if (imageUrl.length > 0) {
            localStorage.setItem("avatar", imageUrl);
            setIsGoodToGo(true);
        } else {
            localStorage.removeItem("avatar");
            setIsGoodToGo(false);
        }
    }, [imageUrl, setIsGoodToGo]);

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleFileUpload = async (file) => {
        if (!file || !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            setDialogOpen(true);
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError("File size must be under 2MB.");
            setDialogOpen(true);
            return;
        }

        const filePath = `uploads/${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
            .from("hng_test")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            setError("Failed to upload image. Please try again.");
            setDialogOpen(true);
            return;
        }

        const { data: publicUrlData } = supabase.storage
            .from("hng_test")
            .getPublicUrl(filePath);

        if (publicUrlData) {
            const publicUrl = publicUrlData.publicUrl;
            setImageUrl(publicUrl);
            localStorage.setItem("avatar", publicUrl);
            onUpload(publicUrl);
            setError("");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 border rounded-lg w-full max-w-sm text-center border-[#07373F] relative space-y-4">
            <p className="absolute top-2 left-2 text-white text-sm">Upload Profile Picture</p>
            <div 
                className={`bg-[#0A2A35] w-full flex justify-center relative mt-8 p-4 rounded-lg cursor-pointer transition ${
                    dragging ? "border-2 border-dashed border-[#24A0B5]" : ""
                }`}
                onClick={() => document.getElementById("fileInput").click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="w-32 h-32 border-2 rounded-full flex items-center justify-center bg-[#0E464F] opacity-35 border-4 border-[#24A0B5] text-gray-500 relative">
                    {imageUrl && (
                        <img 
                            src={imageUrl} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover rounded-full absolute inset-0"
                        />
                    )}
        
                    {!imageUrl && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs bg-black bg-opacity-10 hover:bg-opacity-20 rounded-full transition duration-200">
                            <CloudUpload className="w-8 h-8 text-white" />
                            <p className="text-white">Drag & Drop or Click to Upload</p>
                        </div>
                    )}
                </div>
            </div>
        
            <input 
                type="file" 
                id="fileInput" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />
            
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="Upload Error"
                    message={error}
                />
            )}
        </div>
    );
};

export default ProfilePictureUploader;
