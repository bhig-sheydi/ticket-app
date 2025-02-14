import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import EventCard from "./EventCard";
import PricingCard from "./PriceCard";
import EventContainer from "./EventContainer";
import TicketNumberSelector from "./TicketNumberSelector";
import ProfilePictureUploader from "./ProfilePictureUploader";
import EventForm from "./EventForm";
import TicketUi from "./TicketUi"; // Import TicketUi component
import TicketCard from "./TicketCard";

const initialPricingOptions = [
  { id: 1, price: 0, accessType: "Regular Access", ticketsSold: 20, totalTickets: 52 },
  { id: 2, price: 150, accessType: "VIP Access", ticketsSold: 10, totalTickets: 50 },
  { id: 3, price: 100, accessType: "Premium Access", ticketsSold: 5, totalTickets: 20 },
];

const MIN_TICKETS = 1;
const MAX_TICKETS = 6;

const CardPagination = () => {
  const [page, setPage] = useState(1);
  const [pricingOptions, setPricingOptions] = useState(initialPricingOptions);
  const [selectedPrice, setSelectedPrice] = useState(
    localStorage.getItem("selectedPrice") ? parseInt(localStorage.getItem("selectedPrice")) : null
  );
  const [selectedTickets, setSelectedTickets] = useState(
    localStorage.getItem("selectedTickets") ? parseInt(localStorage.getItem("selectedTickets")) : 1
  );


  const [error, setError] = useState("");

  const maxPage = 3;

  const getValidPrice = (price) => {
    return pricingOptions.find((option) => option.price === price)?.price || 0;
  };

  const totalCost = getValidPrice(selectedPrice) * selectedTickets;

  useEffect(() => {
    if (selectedPrice !== null) {
      localStorage.setItem("selectedPrice", selectedPrice);
    }
  }, [selectedPrice]);

  useEffect(() => {
    localStorage.setItem("selectedTickets", selectedTickets);
  }, [selectedTickets]);


  const handleNext = () => {
    if (page === 1) {
      if (!selectedPrice && selectedPrice !== 0) {
        setError("Please select a valid ticket type.");
        return;
      }
      if (selectedTickets < MIN_TICKETS || selectedTickets > MAX_TICKETS) {
        setError(`Please select between ${MIN_TICKETS} and ${MAX_TICKETS} tickets.`);
        return;
      }

      setPricingOptions((prevOptions) =>
        prevOptions.map((option) =>
          option.price === selectedPrice
            ? { ...option, ticketsSold: option.ticketsSold + selectedTickets }
            : option
        )
      );
    }

    setError("");
    if (page < maxPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-[90%] sm:w-[75%] md:w-[65%] lg:w-[60%] min-h-[400px] sm:min-h-[500px] md:min-h-[600px] mx-auto p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-[#0E464F] rounded-[2rem] relative flex flex-col justify-between shadow-md shadow-[#0E464F]/50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Ticket Selection</h1>
        <span className="text-lg sm:text-xl font-bold text-gray-400 mt-2 sm:mt-0">
          Step {page} / {maxPage}
        </span>
      </div>

      <div className="w-full bg-[#0E464F] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#24A0B5] transition-all"
          style={{ width: `${(page / maxPage) * 100}%` }}
        ></div>
      </div>

      <div className="mt-7 text-center text-lg sm:text-xl font-medium flex-grow flex items-center justify-center flex-col">
        {page === 1 ? (
          <>
            <EventCard />
            <EventContainer>
              <h2 className="text-2xl font-bold text-white text-center mb-4">Select ticket type</h2>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                {pricingOptions.map((option) => (
                  <PricingCard
                    key={option.id}
                    price={`$${option.price}`}
                    accessType={option.accessType}
                    ticketsSold={option.ticketsSold}
                    totalTickets={option.totalTickets}
                    isSelected={selectedPrice === option.price}
                    onSelect={() => setSelectedPrice(option.price)}
                  />
                ))}
              </div>
              <div className="mt-6">
                <TicketNumberSelector
                  options={[1, 2, 3, 4, 5, 6]}
                  selected={selectedTickets}
                  onChange={(num) => {
                    if (num >= MIN_TICKETS && num <= MAX_TICKETS) {
                      setSelectedTickets(num);
                    }
                  }}
                />
              </div>
              {selectedPrice !== null && (
                <p className="mt-4 text-lg text-white font-bold">
                  Total Cost: <span className="text-green-400">${totalCost.toFixed(2)}</span>
                </p>
              )}
              {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            </EventContainer>
          </>
        ) : page === 2 ? (
          <>
            <ProfilePictureUploader onUpload={(image) => setProfilePicture(image)} />
            <div className="flex justify-center w-full">
              <EventForm onSave={(data) => setEventData(data)} />
            </div>
          </>
        ) : (
          <TicketCard/>
        )}
      </div>

      <button
        onClick={handleNext}
        className={`mt-4 py-2 px-4 rounded flex items-center mx-auto transition-all ${page === maxPage ? "opacity-50 cursor-not-allowed bg-gray-500" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        disabled={page === maxPage}
      >
        Next <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default CardPagination;
