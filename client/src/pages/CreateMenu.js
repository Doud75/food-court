import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { postFetch } from "../utils/postFetch";
import { useParams, useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function CreateMenu() {
  const navigate = useNavigate();
  const { restaurantID } = useParams();
  const [menuData, setMenuData] = useState({
    dishes: "",
    price: "",
    restaurant_id: restaurantID,
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCancel = () => {
    setMenuData({ dishes: "", price: 0.0, restaurant_id: "" });
    navigate(`/Restaurants/${restaurantID}/Menus/Handler`);
  };

  const handleAddMenuClick = async () => {
    if (!menuData.dishes || isNaN(menuData.price)) {
      setError("Please fill out all the fields");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    try {
      const response = await postFetch("/insert-menu", menuData);
      if (response === 409) {
        setError("The name menu already exist");
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        navigate(`/Restaurants/${restaurantID}/Menus/Handler`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col m-6 mt-12">
      <h1 className="text-xl">Create menu</h1>
      <div className="mt-12 flex flex-col gap-4">
        <div>
          <span>Name</span>
          <Input
            variant="outline"
            placeholder="Enter name"
            name="dishes"
            value={menuData.dishes}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Price</span>
          <Input
            variant="outline"
            placeholder="Enter price"
            name="price"
            pattern="[0-9]+([.][0-9]+)?"
            value={menuData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex justify-between mt-12">
        <Button
          variant="solid"
          colorScheme="teal"
          size="lg"
          onClick={handleAddMenuClick}
        >
          Add Menu
        </Button>
        <Button
          variant="outline"
          colorScheme="red"
          size="lg"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
      {error && (
        <Alert status="error" className="mt-12">
          <AlertIcon />
          <AlertTitle>Error :</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
