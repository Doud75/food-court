import { useState, useEffect } from "react";
import { getFetch } from "../../utils/getFetch";
import { Card, Button } from "@chakra-ui/react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(
          `/orders/1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex m-9">
        <span className="text-lg">Basket</span>
      </div>
      <div className="m-8">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="my-4">
              <div className="flex justify-between pt-4 px-4">
                <span className="text-lg">{order.restaurant_name}</span>
                <span className="text-lg">#{order.reference}</span>
              </div>
              <div className="p-4">
                <ul>
                  {Object.keys(order.dishes_list).map((dish) => (
                    <li className="text-sm my-2" key={dish}>
                      {dish}: {order.dishes_list[dish]}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between pt-4">
                  <span className="text-base">Total</span>
                  <span className="text-lg">{order.total_price}</span>
                </div>
                <div className="flex my-3">
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    size="sm"
                    width="100%"
                    isDisabled={order.state === "pending"}
                  >
                    {order.state.charAt(0).toUpperCase() + order.state.slice(1)}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <span>No order available</span>
        )}
      </div>
    </div>
  );
}
