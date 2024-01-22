import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Restaurants from "./pages/Restaurants";
import MenuList from "./pages/MenuList.js";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CreateRestaurant from "./pages/CreateRestaurant";

import "./index.css";
const test = "6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f";
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
              element={<MenuList restaurantID={test} />}
            />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/CreateRestaurant" element={<CreateRestaurant />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
