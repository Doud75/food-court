import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Restaurants from "./pages/restaurants";
import MenuList from "./pages/menuList";
import Orders from "./pages/orders";
import Connexion from "./pages/connexion";
import Admin from "./pages/admin";
import CreateRestaurant from "./pages/createRestaurant";

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
            <Route
              path="/Restaurants/Menus"
              element={<MenuList restaurantID={'ici props id_restaurant'} />}
            />
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
