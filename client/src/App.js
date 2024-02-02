import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Restaurants from "./pages/Restaurants";
import MenuList from "./pages/MenuList.js";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MenuHandler from "./pages/MenuHandler";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu.js";

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
              path="/Restaurants/:restaurantID/Menus"
              element={<MenuList />}
            />
            <Route
              path="/Restaurants/:restaurantID/Menus/Handler"
              element={<MenuHandler />}
            />
            <Route
              path="/Restaurants/:restaurantID/Menus/Handler/CreateMenu"
              element={<CreateMenu />}
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
