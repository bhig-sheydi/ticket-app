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
        <div className="min-h-screen flex flex-col justify-center items-center p-6 relative bg-gradient-to-br from-[#12464E] via-[#71A7AF] to-[#133D44]">
    
            <div className="border border-[#24A0B5] p-2 relative">
                <div
                    className="border border-[#24A0B5] bg-[#133D44] text-white w-full max-w-md h-[500px] flex flex-col justify-between p-6"
                    style={{
                        clipPath: "polygon(0% 10px, 10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%)",
                    }}
                >
                    <h2 className="text-xl font-bold text-center">🎟️ EVENT TICKET 🎟️</h2>

            
                    {ticketDetails.profilePicture && (
                        <div className="flex justify-center">
                            <img
                                src={ticketDetails.profilePicture}
                                alt="Profile"
                                className="w-14 h-14 rounded-full border border-white"
                            />
                        </div>
                    )}

                    
                    <table className="w-full text-sm mt-4">
                        <tbody>
                            <tr>
                                <td className="p-2 font-semibold">Name:</td>
                                <td className="p-2 text-right">{ticketDetails.name}</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Email:</td>
                                <td className="p-2 text-right">{ticketDetails.email}</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Access Type:</td>
                                <td className="p-2 text-right">{selectedAccessType}</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Tickets:</td>
                                <td className="p-2 text-right">{ticketDetails.selectedTickets}</td>
                            </tr>
                            <tr>
                                <td className="p-2 font-semibold">Total Cost:</td>
                                <td className="p-2 text-right">${ticketDetails.totalCost}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className="text-center text-sm italic text-gray-300 mt-4">Thank you for your purchase! 🎉</p>
                </div>
            </div>
        </div>
    );
};

export default TicketUi;
