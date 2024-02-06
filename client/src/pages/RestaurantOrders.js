import { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import {Button, Card, CardBody, Flex, Stack, Text} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/ui/CardComponent";
import {deleteFetch} from "../utils/deleteFetch";
import {postFetch} from "../utils/postFetch";

const RestaurantOrders = () => {
    const [orders, setOrders] = useState([]);
    const { restaurantID } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFetch(`/orders/${restaurantID}`);
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

            setOrders((prevOrder) => prevOrder.filter((order) => order.id !== orderID));
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    return (
        <>
            <nav className="p-6">
                <Button colorScheme="teal" size="sm">
                    <a href="/restaurants">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="feather feather-arrow-left"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </a>
                </Button>
            </nav>
            <div className="p-8">
                {orders && orders.length > 0 ? (
                    orders.map((order) => (
                        <Card key={order.id} className="mb-5">
                            <CardBody>
                                <Text className="flex justify-between px-3 pt-3">
                                    <span className="text-base font-semibold">Order N°</span>
                                    <span className="text-base font-semibold">{order.reference}</span>
                                </Text>
                                <Stack className="flex justify-between px-3 pt-3">
                                    {Object.entries(order.dishes_list).map(([dish, quantity], index) => (
                                        <Text key={index} className="text-base">
                                            {dish} : {quantity}
                                        </Text>
                                    ))}
                                </Stack>
                                <Text className="flex justify-between px-3 pt-3">
                                    <span className="text-base font-bold">Total</span>
                                    <span className="text-base font-bold">{order.total_price} €</span>
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
