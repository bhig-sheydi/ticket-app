import { useState, useRef, useEffect } from "react";
import Dialog from "./Dialog";
import { useAuthContext } from "../contexts/AuthContext";

const EventForm = ({ onNext }) => {
  const { setIsAuthenticated } = useAuthContext();

  const getStoredValue = (key) => localStorage.getItem(key) || "";

  const [formData, setFormData] = useState({
    name: getStoredValue("name"),
    email: getStoredValue("email"),
    specialRequests: getStoredValue("specialRequests"),
  });

  const [errors, setErrors] = useState({});
  const [dialogMessage, setDialogMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    inputRefs[focusedIndex]?.current?.focus();
  }, [focusedIndex]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = `${name.replace(/([A-Z])/g, ' $1')} is required`;
    } else if (name === "email" && !validateEmail(value)) {
      error = "Invalid email format";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) => Math.min(prev + 1, inputRefs.length - 1));
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      specialRequests: validateField("specialRequests", formData.specialRequests),
    };
    setErrors(newErrors);

    const isValid = !Object.values(newErrors).some(Boolean);

    if (isValid) {
      Object.keys(formData).forEach((key) => {
        localStorage.setItem(key, formData[key]);
      });

      setIsAuthenticated(true);

      setDialogMessage("Your form has been submitted successfully.");
      setShowDialog(true);

      if (onNext) {
        onNext();
      }
    }
  }, [formData, setIsAuthenticated, onNext]);

  return (
    <>
      <form
        className="p-6 border-t-4 mt-10 border-[#71A7AF] rounded-2xl w-full max-w-lg shadow-lg text-white space-y-4 md:space-y-6 text-left"
      >
        <div className="text-left">
          <label htmlFor="name" className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={inputRefs[0]}
            value={formData.name}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white"
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="text-left">
          <label htmlFor="email" className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            ref={inputRefs[1]}
            value={formData.email}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 1)}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="text-left">
          <label htmlFor="specialRequests" className="block font-medium mb-1">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            ref={inputRefs[2]}
            value={formData.specialRequests}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, 2)}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white h-32"
            placeholder="Any special requests?"
          />
          {errors.specialRequests && <p className="text-red-500 text-sm mt-1">{errors.specialRequests}</p>}
        </div>
      </form>

    
    </>
  );
};

export default EventForm;