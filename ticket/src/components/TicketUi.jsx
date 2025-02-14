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
    <div className="relative bg-transparent p-6 rounded-xl shadow-lg border border-[#1e3a5f] w-[90%] max-w-sm text-white">
      <h2 className="text-xl font-bold text-center">{ticket.eventName}</h2>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-3">
        <FaMapMarkerAlt /> <span>{ticket.location}</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mt-1">
        <FaCalendarAlt /> <span>{ticket.date}</span>
      </div>

      <div className="mt-4 flex justify-center">
        <img
          src={ticket.profilePicture}
          alt="User"
          className="w-20 h-20 object-cover rounded-lg border-2 border-[#1e3a5f]"
        />
      </div>

      <div className="mt-4 bg-[#102b47] p-4 rounded-lg text-sm">
        <p><strong>Name:</strong> {ticket.name || "N/A"}</p>
        <p><strong>Email:</strong> {ticket.email || "N/A"}</p>
        <p><strong>Ticket Type:</strong> {ticket.ticketType}</p>
        <p><strong>Ticket for:</strong> {ticket.ticketFor || "N/A"}</p>

        <p className="mt-2"><strong>Special Request:</strong></p>
        <textarea
          className="w-full bg-transparent border border-gray-600 p-2 rounded-lg text-white resize-none text-sm h-14"
          value={ticket.specialRequest || "No special request"}
          readOnly
        />
      </div>
    </div>
  );
};

export default TicketUi;
