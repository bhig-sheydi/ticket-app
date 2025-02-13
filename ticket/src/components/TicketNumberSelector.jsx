import { useState } from "react";

const TicketNumberSelector = ({ options = [], selected, onChange }) => {
  const [customValue, setCustomValue] = useState("");

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setCustomValue("");
      onChange(""); 
    } else {
      setCustomValue("");
      onChange(value);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/, ""); 
    setCustomValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold text-sm sm:text-base">Number of Tickets</label>
      <select
        className="p-2 border-2 border-[#197686] bg-transparent text-white rounded-md focus:outline-none"
        value={selected || ""}
        onChange={handleSelect}
      >
        <option value="" disabled>Select Tickets</option>
        {options.map((option, index) => (
          <option key={index} value={option} className="text-black">
            {option}
          </option>
        ))}
        <option value="custom" className="text-black">Custom</option>
      </select>

      {selected === "custom" && (
        <input
          type="number"
          min="1"
          className="p-2 border-2 border-[#197686] bg-transparent text-white rounded-md focus:outline-none"
          placeholder="Enter custom amount"
          value={customValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default TicketNumberSelector;
