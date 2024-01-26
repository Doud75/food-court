import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import { Card, CardBody, Text, Image, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const { restaurantID } = useParams();

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

  return (
    <>
      <nav className="p-6">
        <Button colorScheme="teal" size="sm">
          <a href="/Restaurants">
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
          </a>
        </Button>
      </nav>
      <div className="p-8">
        {menus && menus.length > 0 ? (
          menus.map((menu) => (
            <Card key={menu.id} className="mb-5">
              <CardBody>
                <Image
                  src="https://source.unsplash.com/bol-de-salades-de-legumes-IGfIGP5ONV0"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Text className="flex justify-between pt-3 px-3">
                  <span className="text-base font-semibold">{menu.dishes}</span>
                  <span className="text-base font-bold">{menu.price} €</span>
                </Text>
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
