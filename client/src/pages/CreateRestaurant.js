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
    image: null,
  });
  const [error, setError] = useState(null);

  const handleClick = () => setShow(!show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setRestaurantData((prevData) => ({ ...prevData, image: imageFile }));
    console.log(e.target.files[0])
  };

  const handleCancel = () => {
    setRestaurantData({ name: "", category: "", password: "", image: null });
    navigate("/admin");
  };

  const handleAddRestaurantClick = async () => {
    if (
      !restaurantData.name ||
      !restaurantData.category ||
      !restaurantData.password ||
      !restaurantData.image
    ) {
      setError("Please fill out all the fields");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", restaurantData.name);
      formData.append("category", restaurantData.category);
      formData.append("password", restaurantData.password);
      formData.append("image", restaurantData.image);

      console.log(formData); // FormData {}

      const response = await postFetch("/insert-restaurant", formData);
      if (response === 409) {
        setError("The restaurant name already exists");
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(restaurantData); // {name: 'Restaurant4', category: 'Italian', password: 'pass', image: File}

  return (
    <div className="flex flex-col m-6 mt-12">
      <h1 className="text-xl">Create restaurant</h1>
      <div className="flex flex-col gap-4 mt-12">
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
        <div>
          <span>Image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
