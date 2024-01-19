import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Menus from "./pages/Menus";
import Orders from "./pages/Orders";
import Connexion from "./pages/Connexion";
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
