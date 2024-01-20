import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  const handleAddRestaurantClick = () => {
    navigate("/CreateRestaurant");
  };

  return (
    <div>
      <Button
        variant="solid"
        colorScheme="teal"
        size="lg"
        onClick={handleAddRestaurantClick}
      >
        Add Restaurant
      </Button>
    </div>
  );
}
