const TicketActions = ({ barcode }) => {
    return (
      <div className="mt-4 space-y-2 w-full max-w-md flex justify-center h-full items-center">
        <div className="w-[80%] bg-white h-10 flex items-center justify-center text-black font-bold tracking-wide text-base px-4 rounded-lg shadow-md">
          {barcode}
        </div>
      </div>
    );
  };
  
  export default TicketActions;
  