import { useState, useEffect } from "react"; 


const EventForm = ({ onNext }) => {
  const getStoredValue = (key) => localStorage.getItem(key) || "";

  const [formData, setFormData] = useState({
    name: getStoredValue("name"),
    email: getStoredValue("email"),
    specialRequests: getStoredValue("specialRequests"),
  });

  const [errors, setErrors] = useState({ name: "", email: "", specialRequests: "" });
  const [isValid, setIsValid] = useState(false); 

  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== localStorage.getItem(key)) {
        localStorage.setItem(key, formData[key]);
      }
    });
  }, [formData]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const nameError = !formData.name.trim() ? "Name is required" : "";
    const emailError = !validateEmail(formData.email) ? "Invalid email format" : "";
    const specialRequestsError = !formData.specialRequests.trim() ? "Special requests cannot be empty" : "";

    setErrors({ name: nameError, email: emailError, specialRequests: specialRequestsError });

    
    setIsValid(!nameError && !emailError && !specialRequestsError);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    
    validateForm();
  }, [formData]);

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) {
      onNext();  
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  return (
    
      <form
        className="p-6 border-t-4 mt-10 border-[#71A7AF] rounded-2xl w-full max-w-lg  shadow-lg text-white space-y-4 md:space-y-6 text-left"
        onSubmit={handleNext}
      >
        <div className="text-left">
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name
          </label>
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

        <div className="text-left">
          <label htmlFor="email" className="block font-medium mb-1">
            Email Address
          </label>
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

        <div className="text-left">
          <label htmlFor="specialRequests" className="block font-medium mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-3 border border-[#24A0B5] rounded-lg bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#24A0B5] h-32"
            placeholder="Any special requests?"
            required
          />
          {errors.specialRequests && <p className="text-red-500 text-sm mt-1">{errors.specialRequests}</p>}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
   );
};

export default EventForm;
