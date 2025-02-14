const Dialog = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-[#04373f] p-6 rounded-lg shadow-lg text-white text-center">
          <h2 className="text-2xl font-semibold">Alert</h2>
          <p className="mt-2">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 py-2 px-6 bg-white text-[#71A7AF] rounded-full hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default Dialog;
  