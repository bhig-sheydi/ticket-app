import React, { useState, useEffect } from "react";
import ticketFrame from "../assets/images/bg.png";
import TicketUi from "./TicketUi";
import TicketActions from "./TicketActions";

const TicketCard = () => {
    const getStoredTicket = () => {
        const storedTicket = JSON.parse(localStorage.getItem("eventTicket")) || {};
        const name = localStorage.getItem("name") || storedTicket.name || "";
        const email = localStorage.getItem("email") || storedTicket.email || "";
        const ticketFor = localStorage.getItem("selectedTickets") || storedTicket.ticketType || "";
        const specialRequest = localStorage.getItem("specialRequests") || storedTicket.specialRequest || "";
        const profilePicture = localStorage.getItem("avatar") || "https://via.placeholder.com/150";
        const ticketType = localStorage.getItem("selectedPrice");

        const ticketTypeLabel =
            ticketType === "100" ? "VIP" : ticketType === "150" ? "VVIP" : ticketType === "free" ? "Regular" : "N/A";

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
        <div className="flex items-center justify-center relative w-full">
          <div className="relative h-full">
          <img src={ticketFrame} alt="Ticket Frame" className="w-full h-auto max-w-[414px]" />

      
            
            <div className="absolute pb-[90%] sm:pb-0 top-[3%] left-0 w-full h-full flex flex-col items-center justify-center">
               <div className=" pt-[100%] top-[-16%] left-[5%] sm-left-0 sm:top-0 p sm:pt-0 sm:pb-[30%] sm:left-[5%] relative">
               <TicketUi ticket={ticket} />
               </div>
              <div className="mb-9 md:mb-0 top-7 sm:mb-[30%] relative sm:top-[-9%]">
              <TicketActions barcode={ticket.barcode}  /> 
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default TicketCard;