const EventContainer = ({ children }) => {
    return (
      <div
        className="w-full p-6 rounded-lg shadow-md border-t-5 mt-10"
        style={{
          borderTopColor: "#07373F",
          backgroundColor: "transparent",
        }}
      >
        {children}
      </div>
    );
  };
  
  export default EventContainer;
  