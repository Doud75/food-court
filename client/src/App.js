import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MenuList from "./pages/MenuList.js";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MenuHandler from "./pages/MenuHandler";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu.js";
import Home from "./pages/Home.js";

import "./index.css";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<Home />} />
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
