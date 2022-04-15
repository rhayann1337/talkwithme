import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Rooms from "./pages/Rooms";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/rooms" element={<Rooms />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
