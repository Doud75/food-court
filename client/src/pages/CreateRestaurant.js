import React from "react";
import { Input, InputRightElement, InputGroup, Button } from "@chakra-ui/react";
import { postFetch } from "../utils/postFetch";

export default function CreateRestaurant() {
  const [show, setShow] = React.useState(false);
  const [restaurantData, setRestaurantData] = React.useState({
    name: "",
    category: "",
    password: "",
  });

  const handleClick = () => setShow(!show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddRestaurantClick = async () => {
    try {
      await postFetch("/insert-restaurant", restaurantData);
      console.log("Restaurant added successfully!");

      // Reset the form after adding the restaurant
      // setRestaurantData({
      //   name: "",
      //   category: "",
      //   password: "",
      // });
    } catch (error) {
      console.error("Error adding restaurant:", error);
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
          onClick={() =>
            setRestaurantData({ name: "", category: "", password: "" })
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
