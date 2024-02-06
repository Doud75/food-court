import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MenuList from "./pages/MenuList.js";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import MenuHandler from "./pages/MenuHandler";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu.js";
import Home from "./pages/Home.js";
import RestaurantOrders from "./pages/RestaurantOrders.js";

import "./index.css";
function App() {
  const isAuthenticated = !!sessionStorage.getItem("token");
  console.log(isAuthenticated);
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          {isAuthenticated ? (
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/*" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route
                path="/restaurants/:restaurantID/menus"
                element={<MenuList />}
              />
              <Route
                path="/restaurants/:restaurantID/orders"
                element={<RestaurantOrders />}
              />
              <Route
                path="/restaurants/:restaurantID/menus/handler"
                element={<MenuHandler />}
              />
              <Route
                path="/restaurants/:restaurantID/menus/handler/createMenu"
                element={<CreateMenu />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/createrestaurant" element={<CreateRestaurant />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          )}
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
