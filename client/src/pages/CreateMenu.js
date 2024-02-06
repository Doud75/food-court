import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { postFetch } from "../utils/postFetch";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function CreateMenu() {
  const navigate = useNavigate();
  const restaurantID = sessionStorage.getItem("ID");
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
    setMenuData({ dishes: "", price: "", restaurant_id: "" });
    navigate(`/home-restaurant`);
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
        navigate(`/home-restaurant`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col m-6 mt-12">
      <h1 className="text-xl">Create menu</h1>
      <div className="flex flex-col gap-4 mt-12">
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
            type="number"
            step="0.01"
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
