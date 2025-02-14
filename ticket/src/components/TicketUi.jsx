import { useEffect, useState } from "react";     
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const TicketUi = () => {
  const getStoredTicket = () => {
    const storedTicket = JSON.parse(localStorage.getItem("eventTicket")) || {};
    const name = localStorage.getItem("name") || storedTicket.name || "";
    const email = localStorage.getItem("email") || storedTicket.email || "";
    const ticketFor = localStorage.getItem("selectedTickets") || storedTicket.ticketType || "";
    const specialRequest = localStorage.getItem("specialRequests") || storedTicket.specialRequest || "";
    const profilePicture = localStorage.getItem("avatar") || "https://via.placeholder.com/150";
    const ticketType = localStorage.getItem("selectedPrice");

    const ticketTypeLabel =
      ticketType === "100" ? "VIP" : ticketType === "150" ? "VVIP" : ticketType === "0" ? "Regular" : "N/A";

    return {
      eventName: "Techember Fest '25",
      location: "04 Rumens road, Ikoyi, Lagos",
      date: "March 15, 2025 | 7:00 PM",
      barcode: "1 234 567 891 026",
      name,
      email,
      ticketType: ticketTypeLabel,
      specialRequest,
      profilePicture,
      ticketFor,
    };
  };

  const [ticket, setTicket] = useState(getStoredTicket);

  useEffect(() => {
    setTicket(getStoredTicket());
  }, []);

  return (
    <div className="relative bg-transparent p-4 rounded-xl shadow-lg border border-[#1e3a5f] w-[90%] max-w-sm text-white h-[420px] sm:h-[450px]">
      <h2 className="text-xl font-normal text-center">{ticket.eventName}</h2>

      <div className="flex items-center justify-center gap-1 text-gray-400 text-[10px] mt-3">
        <FaMapMarkerAlt /> <span>{ticket.location}</span>
      </div>

      <div className="flex items-center justify-center gap-1 text-gray-400 text-[10px] mt-1">
        <FaCalendarAlt /> <span>{ticket.date}</span>
      </div>

      <div className="mt-4 flex justify-center w-full">
        <img
          src={ticket.profilePicture}
          alt="User"
          className="w-25 h-25 object-cover rounded-lg border-2 border-[#1e3a5f]"
        />
      </div>

  
      <div className="mt-4  p-4 rounded-lg text-[10px] grid grid-cols-2 gap-2">
        <div className="overflow-hidden">
          <p className="text-[10px]">Name:</p>
          <p className="text-wrap">{ticket.name || "N/A"}</p>
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px]">Email:</p>
          <p className="text-wrap">{ticket.email || "N/A"}</p>
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px]">Ticket Type:</p>
          <p className="text-wrap">{ticket.ticketType}</p>
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px]">Ticket For:</p>
          <p className="text-wrap">{ticket.ticketFor || "N/A"}</p>
        </div>

      
        <div className="col-span-2 mt-2">
          <p className="text-[10px]">Special Request:</p>
          <textarea
            className="w-full bg-transparent border border-gray-600 p-1 rounded-lg text-white resize-none text-[10px] h-10"
            value={ticket.specialRequest || "No special request"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default TicketUi;
