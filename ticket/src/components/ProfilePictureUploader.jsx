import { useState, useEffect } from "react"; 
import { CloudUpload } from "lucide-react";

const ProfilePictureUploader = ({ onUpload }) => {
    const [imageUrl, setImageUrl] = useState(localStorage.getItem("avatar") || "");
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (imageUrl) {
            localStorage.setItem("avatar", imageUrl);
        }
    }, [imageUrl]);

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

    const handleFileUpload = (file) => {
        if (!file || !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
            onUpload(reader.result);
            setError("");
        };
        reader.readAsDataURL(file);
    };

    const handleUrlUpload = (event) => {
        const url = event.target.value;
        if (url.startsWith("http") && (url.includes("cloudinary") || url.match(/(png|jpe?g|gif)$/))) {
            setImageUrl(url);
            onUpload(url);
            setError("");
        } else {
            setError("Please enter a valid Cloudinary or external image URL.");
        }
    };

    return (
        <div className="flex flex-col items-center p-6 border rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg text-center border-[#07373F] relative space-y-4">
            <p className="absolute top-2 left-2 text-white text-sm md:text-base">Upload Profile Picture</p>
            <div 
                className={`bg-[#0A2A35] w-full flex justify-center relative mt-8 p-4 rounded-lg cursor-pointer transition ${
                    dragging ? "border-2 border-dashed border-[#24A0B5]" : ""
                }`}
                onClick={() => document.getElementById("fileInput").click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="w-32 h-32 md:w-40 md:h-40 border-2 rounded-full flex items-center justify-center bg-[#0E464F] opacity-35 border-4 border-[#24A0B5] text-gray-500 relative">
                    {imageUrl && (
                        <img 
                            src={imageUrl} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover rounded-full absolute inset-0"
                        />
                    )}
                    {/* Icon and Write-up (Always Visible) */}
                    {!imageUrl && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs md:text-sm bg-black bg-opacity-10 hover:bg-opacity-20 rounded-full transition duration-200">
                            <CloudUpload className="w-8 h-8 md:w-10 md:h-10 text-white" />
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
            <input
                type="text"
                placeholder="Or paste image URL"
                className="mt-4 p-3 border rounded w-full text-xs md:text-sm"
                onBlur={handleUrlUpload}
            />
            {error && <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>}
        </div>
    );
};

export default ProfilePictureUploader;
