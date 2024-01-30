import { useState } from "react";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { postFetch } from "../utils/postFetch";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function CreateRestaurant() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    category: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleClick = () => setShow(!show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleCancel = () => {
    setRestaurantData({ name: "", category: "", password: "" });
    navigate("/Admin");
  };

  const handleAddRestaurantClick = async () => {
    if (
      !restaurantData.name ||
      !restaurantData.category ||
      !restaurantData.password
    ) {
      setError("Please fill out all the fields");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    try {
      const test = await postFetch("/insert-restaurant", restaurantData);
      if (test === 409) {
        setError("The name restaurant already exist");
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        navigate("/Admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col m-6 mt-12">
      <h1 className="text-xl">Create restaurant</h1>
      <div className="mt-12 flex flex-col gap-4">
        <div>
          <span>Name</span>
          <Input
            variant="outline"
            placeholder="Enter name"
            name="name"
            value={restaurantData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Category</span>
          <Input
            variant="outline"
            placeholder="Enter category"
            name="category"
            value={restaurantData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <span>Password</span>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              value={restaurantData.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <Button size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>
      </div>
      <div className="flex justify-between mt-12">
        <Button
          variant="solid"
          colorScheme="teal"
          size="lg"
          onClick={handleAddRestaurantClick}
        >
          Add Restaurant
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
