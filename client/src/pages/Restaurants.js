import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import { Card, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import CardComponent from '../components/ui/CardComponent.js';

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/restaurants`);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <nav className="p-6"></nav>
      <div className="p-5">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Link to={"/restaurants/" + restaurant.id + "/menus"}>
              <Card
                key={restaurant.id}
                className="mb-5"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image
                  className="h-40"
                  src="https://source.unsplash.com/bol-de-salades-de-legumes-IGfIGP5ONV0"
                  alt="Green double couch with wooden legs"
                />
                <Text className="p-3 pt-3">
                  <div className="w-4/6">
                    <h4 className="mb-2 text-base font-semibold">
                      {restaurant.name}
                    </h4>
                    <p className="text-sm line-clamp-2">
                      {restaurant.description}
                    </p>
                  </div>
                </Text>
              </Card>
            </Link>
          ))
        ) : (
          <span>No restaurant available</span>
        )}
      </div>
    </>
  );
}