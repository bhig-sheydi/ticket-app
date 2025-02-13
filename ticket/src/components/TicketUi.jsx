import { useState, useEffect } from "react";

const TicketUi = () => {
  const pricingOptions = [
    { price: 0, accessType: "Regular Access" },
    { price: 150, accessType: "VIP Access" },
    { price: 100, accessType: "Premium Access" },
  ];

  const [ticketDetails, setTicketDetails] = useState({
    selectedPrice: "N/A",
    selectedTickets: "1",
    profilePicture: "",
    totalCost: "0.00",
    name: "",
    email: "",
    specialRequests: "",
  });

  useEffect(() => {
    setTicketDetails({
      selectedPrice: localStorage.getItem("selectedPrice") || "N/A",
      selectedTickets: localStorage.getItem("selectedTickets") || "1",
      profilePicture: localStorage.getItem("avatar") || "",
      totalCost: localStorage.getItem("totalCost") || "0.00",
      name: localStorage.getItem("name") || "Not Provided",
      email: localStorage.getItem("email") || "Not Provided",
      specialRequests: localStorage.getItem("specialRequests") || "None",
    });
  }, []);

  const selectedAccessType =
    pricingOptions.find((option) => option.price == ticketDetails.selectedPrice)?.accessType || "N/A";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-[#0D2A30] -full">
      <div className="border border-[#24A0B5] p-2 sm:p-3 rounded-xl shadow-lg w-full max-w-sm sm:max-w-md">
        <div
          className="border border-[#24A0B5] bg-[#133D44] text-white w-full h-auto flex flex-col justify-between p-4 sm:p-6 rounded-lg shadow-xl relative"
          style={{
            clipPath: "polygon(0% 10px, 10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%)",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-extrabold text-center tracking-wider text-[#24A0B5]">
            🎟️ EVENT TICKET 🎟️
          </h2>

          {ticketDetails.profilePicture && (
            <div className="flex justify-center mt-3">
              <img
                src={ticketDetails.profilePicture}
                alt="Profile"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#24A0B5] shadow-lg"
              />
            </div>
          )}

          <div className="mt-4">
            <table className="w-full text-xs sm:text-sm border-separate border-spacing-y-2">
              <tbody>
                <tr>
                  <td className="p-2 font-semibold text-gray-300">👤 Name:</td>
                  <td className="p-2 text-right text-white">{ticketDetails.name}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-gray-300">📧 Email:</td>
                  <td className="p-2 text-right text-white">{ticketDetails.email}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-gray-300">🎫 Access Type:</td>
                  <td className="p-2 text-right text-[#24A0B5] font-bold">{selectedAccessType}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-gray-300">🎟️ Tickets:</td>
                  <td className="p-2 text-right text-white">{ticketDetails.selectedTickets}</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold text-gray-300">💰 Total Cost:</td>
                  <td className="p-2 text-right text-green-400 font-bold">${ticketDetails.totalCost}</td>
                </tr>
              </tbody>
            </table>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default TicketUi;
