import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Events from "./pages/Events";
import TicketCard from "./components/TicketCard";
import { AuthProvider } from "./contexts/AuthContext"; 
import "./App.css";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Header />
        <div className="pt-24 p-6">
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/my-tickets" element={<TicketCard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
