import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import { Card, CardBody, Text, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const { restaurantID } = useParams();

  const handleReturn = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/restaurants/${restaurantID}/menus`);
        setMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchData();
  }, [restaurantID]);
  async function addDishiesToOrder(menu) {
    const existingOrders = JSON.parse(sessionStorage.getItem("orders")) || {};
    const { dishes, id, price, restaurant_id, restaurant_name } = menu;
    if (existingOrders[id]) {
      existingOrders[id].quantity += 1;
    } else {
      existingOrders[id] = {
        dishes,
        id,
        price,
        restaurant_id,
        restaurant_name,
        quantity: 1,
      };
    }

    sessionStorage.setItem("orders", JSON.stringify(existingOrders));
  }

  return (
    <>
      <nav className="p-6">
        <Button colorScheme="teal" size="sm" onClick={handleReturn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="feather feather-arrow-left"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Button>
      </nav>

      <div className="p-8">
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <Card key={menu.id} className="mb-5">
              <CardBody>
                {/* <Image
                  src="https://source.unsplash.com/bol-de-salades-de-legumes-IGfIGP5ONV0"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                /> */}
                <Text className="flex justify-between py-2">
                  <span className="text-base font-semibold">{menu.dishes}</span>
                  <span className="text-base font-bold">{menu.price} €</span>
                </Text>
                <Button
                  onClick={() => addDishiesToOrder(menu)}
                  className="w-full mx-auto"
                  colorScheme="teal"
                  size="sm"
                >
                  Add to order
                </Button>
              </CardBody>
            </Card>
          ))
        ) : (
          <span>No menu available</span>
        )}
      </div>
    </>
  );
};

export default MenuList;
