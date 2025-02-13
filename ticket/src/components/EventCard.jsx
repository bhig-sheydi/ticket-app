const EventCard = () => {
  return (
    <div
      className="p-4 sm:p-6 rounded-lg shadow-lg relative text-white border border-[#0E464F] overflow-hidden"
      style={{
        background: `linear-gradient(225deg, #0E464F 10%, #08252B 80%)`,
      }}
    >
    
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          background: `radial-gradient(circle at top right, rgba(255, 255, 255, 0.4) 0%, transparent 50%)`,
        }}
      ></div>

      <h1 className="text-2xl sm:text-3xl font-bold relative z-10">
        Techember Fest ’25
      </h1>
      <p className="mt-2 text-gray-300 relative z-10 text-[#FAFAFA] text-sm sm:text-base">
        Join us for an unforgettable experience at [Event Name]! Secure your spot now.
      </p>
      <p className="mt-2 text-gray-400 relative z-10 text-xs sm:text-sm">
        March 15, 2025 | 7:00 PM
      </p>
    </div>
  );
};

export default EventCard;
