import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/ui/CardComponent";
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
          <a href="/restaurants">
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
            <CardComponent
              key={menu.id}
              name={menu.dishes}
              description={
                "Lorem ta maman aime le chocolats mais aussi les grosses gauffre au sucre"
              }
              price={menu.price}
            />
          ))
        ) : (
          <span>No menu available</span>
        )}
      </div>
    </>
  );
};

export default MenuList;
