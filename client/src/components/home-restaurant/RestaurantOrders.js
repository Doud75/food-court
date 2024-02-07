import { useState, useEffect } from "react";
import { Button, Card, CardBody, Flex, Stack, Text } from "@chakra-ui/react";
import { postFetch } from "../../utils/postFetch";
import { getFetch } from "../../utils/getFetch";

const RestaurantOrders = () => {
  const restaurantID = sessionStorage.getItem("ID");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/orders-restaurant/${restaurantID}`);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchData();
  }, [restaurantID]);

  const handleSubmit = async (orderID) => {
    try {
      await postFetch(`/orders/${restaurantID}/${orderID}`);

      setOrders((prevOrder) =>
        prevOrder.filter((order) => order.id !== orderID)
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <div className="p-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="mb-5">
              <CardBody>
                <Text className="flex justify-between px-3 pt-3">
                  <span className="text-base font-semibold">Order N°</span>
                  <span className="text-base font-semibold">
                    {order.reference}
                  </span>
                </Text>
                <Stack className="flex justify-between px-3 pt-3">
                  {Object.entries(order.dishes_list).map(
                    ([dish, quantity], index) => (
                      <Text key={index} className="text-base">
                        {dish} : {quantity}
                      </Text>
                    )
                  )}
                </Stack>
                <Text className="flex justify-between px-3 pt-3">
                  <span className="text-base font-bold">Total</span>
                  <span className="text-base font-bold">
                    {order.total_price} €
                  </span>
                </Text>
                <Flex className="px-3 pt-3">
                  <Button
                    colorScheme="teal"
                    onClick={() => handleSubmit(order.id)}
                  >
                    Valider
                  </Button>
                </Flex>
              </CardBody>
            </Card>
          ))
        ) : (
          <span>No order available</span>
        )}
      </div>
    </>
  );
};

export default RestaurantOrders;
