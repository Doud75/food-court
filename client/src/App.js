import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Restaurants from "./pages/Restaurants";
import Menus from "./pages/Menus";
import Orders from "./pages/Orders";
import Connexion from "./pages/Connexion";
import Admin from "./pages/Admin";
import CreateRestaurant from "./pages/CreateRestaurant";

import "./index.css";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Restaurants />} />
            <Route path="/*" element={<Restaurants />} />
            <Route path="/Restaurants" element={<Restaurants />} />
            <Route path="/Restaurants/Menus" element={<Menus />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Connexion" element={<Connexion />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/CreateRestaurant" element={<CreateRestaurant />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
