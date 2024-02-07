import { useState, useEffect } from "react";
import { getFetch } from "../../utils/getFetch";
import { postFetch } from "../../utils/postFetch";
import { Card, Button } from "@chakra-ui/react";

export default function Orders() {
  const userID = sessionStorage.getItem("ID");
  const [orders, setOrders] = useState([]);
  const [isOrderPending, setOrderPending] = useState(false);

  const ordersString = sessionStorage.getItem("orders");
  const storedOrders = ordersString ? JSON.parse(ordersString) : {};
  const ordersWaiting = Object.values(storedOrders);

  const handleAddOrderClick = async (restaurantId) => {
    const restaurantOrders = groupedOrders[restaurantId].orders;

    const orderDetails = {
      user_id: userID,
      restaurant_id: restaurantId,
      dishes_list: restaurantOrders.reduce((dishesList, order) => {
        dishesList[order.dishes] = order.quantity;
        return dishesList;
      }, {}),
      total_price: parseFloat(
        groupedOrders[restaurantId].totalPrice.toFixed(2)
      ),
    };

    try {
      const response = await postFetch("/insert-order", orderDetails);
      console.log("Order added successfully", response);
      const updatedOrders = Object.fromEntries(
        Object.entries(storedOrders).filter(
          ([key, value]) => !restaurantOrders.find((order) => order.id === key)
        )
      );
      sessionStorage.setItem("orders", JSON.stringify(updatedOrders));
      setOrderPending(true);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/orders-client/${userID}`);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [userID]);

  const groupOrdersByRestaurant = (orderList) => {
    const groupedOrders = {};

    orderList.forEach((order) => {
      const { restaurant_id, price, quantity } = order;
      const numericPrice = parseFloat(price);

      if (!isNaN(numericPrice) && quantity && restaurant_id) {
        if (groupedOrders[restaurant_id]) {
          groupedOrders[restaurant_id].orders.push(order);
          groupedOrders[restaurant_id].totalPrice += numericPrice * quantity;
        } else {
          groupedOrders[restaurant_id] = {
            orders: [order],
            totalPrice: numericPrice * quantity,
          };
        }
      }
    });

    Object.values(groupedOrders).forEach((group) => {
      if (typeof group.totalPrice !== "number") {
        group.totalPrice = 0;
      }
    });
    return groupedOrders;
  };

  const groupedOrders = groupOrdersByRestaurant([...orders, ...ordersWaiting]);

  return (
    <div>
      <div className="flex m-9">
        <span className="text-lg">Basket</span>
      </div>
      <div className="m-8">
        {Object.keys(groupedOrders).map((restaurantId) => (
          <Card key={restaurantId} className="my-4 p-4">
            <h2 className="text-lg">
              {groupedOrders[restaurantId].orders[0].restaurant_name}
            </h2>
            <div className="my-4">
              {groupedOrders[restaurantId].orders.map((order) => (
                <div key={order.id} className="flex justify-between">
                  <p className="text-sm">
                    {order.dishes} {order.quantity}
                  </p>
                  <p>{order.price}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <p className="text-base">Total </p>
              <p className="text-lg">
                {groupedOrders[restaurantId].totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex my-3 ">
              <Button
                variant="solid"
                colorScheme="teal"
                size="sm"
                width="100%"
                onClick={() => handleAddOrderClick(restaurantId)}
                isDisabled={isOrderPending}
              >
                {isOrderPending ? "Pending" : "Order"}
              </Button>
            </div>
          </Card>
        ))}
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
