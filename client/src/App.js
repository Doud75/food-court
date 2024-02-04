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
            <Route path="/restaurants" element={<Restaurants />} />
            <Route
              path="/restaurants/:restaurantID/menus"
              element={<MenuList />}
            />
            <Route
              path="/restaurants/:restaurantID/menus/handler"
              element={<MenuHandler />}
            />
            <Route
              path="/restaurants/:restaurantID/menus/handler/create-menu"
              element={<CreateMenu />}
            />
            <Route path="/orders" element={<Orders />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-restaurant" element={<CreateRestaurant />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
