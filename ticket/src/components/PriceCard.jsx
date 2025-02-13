import { useState } from "react";

const PricingCard = ({ price, accessType, ticketsSold, totalTickets, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative w-full md:w-1/3 p-4 border-2 rounded-lg text-center cursor-pointer transition-transform duration-1000 ${
        isSelected || hovered ? "scale-105" : "scale-100"
      }`}
      style={{
        borderColor: isSelected ? "#12464E" : "#197686",
        backgroundColor: isSelected ? "#12464E" : "transparent",
        boxShadow:
          hovered && !isSelected
            ? "0 0 10px #197686, 0 0 20px #197686, 0 0 30px #197686"
            : "none",
        transition: "box-shadow 1s ease-in-out",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      <h2 className="text-2xl font-extrabold text-white">{price}</h2>
      <p className="text-lg font-medium text-gray-300">{accessType}</p>
      <p className="text-sm text-gray-400">
        {ticketsSold} / {totalTickets} Tickets Sold
      </p>
    </div>
  );
};

export default PricingCard;
