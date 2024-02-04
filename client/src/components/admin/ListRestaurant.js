import { useState, useEffect } from "react";
import { getFetch } from "../../utils/getFetch";
import { deleteFetch } from "../../utils/deleteFetch";
import {
  Divider,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
} from "@chakra-ui/react";
export default function ListRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  const handleDeleteRestaurant = async (id) => {
    try {
      await deleteFetch(`/delete-restaurant`, { id });

      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/restaurants`);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col mt-6">
      <div className="flex text-start mb-3 text-base text-stone-600 font-bold">
        <span className="w-1/2 ">Restaurant</span>
        <span className="w-1/2">Category</span>
      </div>
      <div>
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <Popover key={restaurant.id}>
              <PopoverTrigger>
                <div>
                  <Divider className="mb-6" />
                  <div className="flex text-start mb-3 text-sm">
                    <span className="w-1/2">{restaurant.name}</span>
                    <span className="w-1/2">{restaurant.category}</span>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverHeader border="0" pt={4} className="self-start">
                  Delete {restaurant.name}
                </PopoverHeader>
                <PopoverBody>
                  <div className="text-left">
                    Are you sure? You can’t undo this action afterwards.
                  </div>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    className="float-right"
                    onClick={() => handleDeleteRestaurant(restaurant.id)}
                  >
                    Delete
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ))
        ) : (
          <span>No restaurant available</span>
        )}
      </div>
    </div>
  );
}
