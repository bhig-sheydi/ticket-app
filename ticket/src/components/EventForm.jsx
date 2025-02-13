import { useState, useEffect } from "react";
import EventContainer from "./EventContainer"; 

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("name") || "",
    email: localStorage.getItem("email") || "",
    specialRequests: localStorage.getItem("specialRequests") || "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("name", formData.name);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("specialRequests", formData.specialRequests);
  }, [formData]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: value.trim().length > 0 ? "" : "Name is required",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }
    alert("Form submitted successfully!");
  };

  return (
    <EventContainer>
      <form
        className="p-6 border border-[#71A7AF] rounded-2xl w-full max-w-md bg-gradient-to-br from-[#133D44] via-[#12464E] to-[#71A7AF] shadow-lg text-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">🎟 Register for the Event</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5]"
            placeholder="Enter your full name"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5]"
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

    
        <div className="mb-4">
          <label htmlFor="specialRequests" className="block font-medium mb-1">Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5] h-32"
            placeholder="Any special requests?"
          />
        </div>

    
        <button
          type="submit"
          className="w-full bg-[#24A0B5] hover:bg-[#1B7C91] transition-all duration-300 text-white font-semibold p-3 rounded-lg shadow-md"
        >
          Submit
        </button>
      </form>
    </EventContainer>
  );
};

export default EventForm;
