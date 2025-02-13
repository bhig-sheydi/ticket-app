import React from "react"; 
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 
import logo from "../assets/images/Frame 1618871078.png";

const Header = () => {
  return (
    <div className="w-5/6 mt-5 mx-auto border-2 border-[#197686] rounded-2xl p-3 flex items-center justify-between">
      
      <div className="items-center">
        <img src={logo} alt="Logo" className="h-12 w-auto" />
      </div>


      <div className="hidden md:flex text-center">
        <ul className="flex space-x-10 text-[#B3B3B3]">
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/my-tickets">My Ticket</Link></li>
          <li><Link to="/about">About Project</Link></li>
        </ul>
      </div>

    
      <div className="flex items-center">
        <button className="bg-[#FFFFFF] p-3 flex items-center space-x-2 text-[#0A0C11] rounded-lg">
          <span>My Tickets</span>
          <ArrowRight className="w-5 h-5 text-[#0A0C11]" />
        </button>
      </div>
    </div>
  );
};

export default Header;
