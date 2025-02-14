const TicketActions = ({ barcode }) => {
    return (
      <div className="mt-2 space-y-1">
        <div className="w-full bg-white h-6 flex items-center justify-center text-black font-bold tracking-wide text-sm">
          {barcode}
        </div>
        
      </div>
    );
  };
  
  export default TicketActions;
  