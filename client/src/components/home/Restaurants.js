import { useState, useEffect } from "react";
import { getFetch } from "../../utils/getFetch.js";
import { Link } from "react-router-dom";
import CardComponent from "../ui/CardComponent.js";

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
            <Link
              key={restaurant.id}
              to={"/restaurants/" + restaurant.id + "/menus"}
            >
              <CardComponent
                name={restaurant.name}
                description={restaurant.description}
              />
            </Link>
          ))
        ) : (
          <span>No restaurant available</span>
        )}
      </div>
    </>
  );
}
