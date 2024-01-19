import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/restaurants";
import Menus from "./pages/menus";
import Orders from "./pages/orders";
import Connexion from "./pages/connexion";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Restaurants />} />
          <Route path="/*" element={<Restaurants />} />
          <Route path="/Restaurants" element={<Restaurants />} />
          <Route path="/Restaurants/Menus" element={<Menus />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Connexion" element={<Connexion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
