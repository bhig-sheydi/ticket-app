import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Events from "./pages/Events"; // 
//  import MyTickets from "./pages/MyTickets";
//  import AboutProject from "./pages/AboutProject";

import "./App.css";
import TicketCard from "./components/TicketCard";
function App() {
  return (
    <Router>
      <Header />
      <div className="pt-24 p-6">
        <Routes>
          <Route path="/"element={<Events />} />
           <Route path="/my-tickets" element={<TicketCard/>} />
          {/* <Route path="/about" element={<AboutProject />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
