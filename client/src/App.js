import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MenuList from "./pages/MenuList.js";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import CreateRestaurant from "./pages/CreateRestaurant";
import CreateMenu from "./pages/CreateMenu.js";
import Home from "./pages/Home.js";
import HomeRestaurant from "./pages/HomeRestaurant.js";
import NotificationLayout from "./layouts/NotificationLayout.js";
import "./index.css";

function App() {
  const isAuthenticated =
    !!sessionStorage.getItem("token") &&
    !!sessionStorage.getItem("ID") &&
    !!sessionStorage.getItem("role");

  const requireRole = (requiredRole, element) => {
    if (sessionStorage.getItem("role") !== requiredRole) {
      console.log("Didn't have permission for this route");
      return null;
    }
    return element;
  };
  return (
      <div className="App">
       <NotificationLayout>
          <ChakraProvider>
            <BrowserRouter>
              {isAuthenticated ? (
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/*"
                    element={
                      isAuthenticated ? (
                        sessionStorage.getItem("role") === "admin" ? (
                          <Admin />
                        ) : sessionStorage.getItem("role") === "restaurant" ? (
                          <HomeRestaurant />
                        ) : (
                          <Home />
                        )
                      ) : (
                        <Login />
                      )
                    }
                  />
                  <Route path="/home" element={requireRole("customer", <Home />)} />
                  <Route
                    path="/home-restaurant"
                    element={requireRole("restaurant", <HomeRestaurant />)}
                  />
                  <Route
                    path="/restaurants/:restaurantID/menus"
                    element={requireRole("customer", <MenuList />)}
                  />
                  <Route
                    path="/home-restaurant/create-menu"
                    element={requireRole("restaurant", <CreateMenu />)}
                  />
                  <Route path="/admin" element={requireRole("admin", <Admin />)} />
                  <Route
                    path="/admin/create-restaurant"
                    element={requireRole("admin", <CreateRestaurant />)}
                  />
                </Routes>
              ) : (
                <Routes>
                  <Route path="/*" element={<Login />} />
                </Routes>
              )}
            </BrowserRouter>
          </ChakraProvider>
        </NotificationLayout>
      </div>
  );
}

export default App;
