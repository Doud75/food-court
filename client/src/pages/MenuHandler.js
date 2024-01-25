import React, { useState, useEffect } from "react";
import { getFetch } from "../utils/getFetch";
import {Card, CardBody, Text, Image, Button, Flex} from "@chakra-ui/react";

const MenuList = ({ restaurantID }) => {
    const [menus, setMenus] = useState([]);
    const [popup, setPopup] = useState(false);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFetch(`/restaurants/${restaurantID}/menus`);
                setMenus(data);
            } catch (error) {
                console.error("Error fetching menus:", error);
            }
        };

        fetchData();
    }, [restaurantID]);

    function handlePopup() {
        setPopup(!popup)
    }

    const deleteDishes = () => {
        console.log(selected)
    }

    return (
        <>
            <nav className="p-6">
                <Button colorScheme="teal" size="sm">
                    <a href="/Restaurants">
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
                {menus.map((menu) => (
                    <div>
                        <Card key={menu.id} className="mb-5">
                            {popup && (
                                <div className="fixed top-0 left-0 flex items-center justify-center h-screen bg-black bg-opacity-50">
                                    <div className="bg-white p-4 rounded w-1/2 flex flex-col">
                                        <p>Êtes-vous sûr de vouloir supprimer ce plat : <strong className="font-bold">{menu.dishes}</strong> ?
                                        </p>
                                        <div className="flex justify-end">
                                            <Button colorScheme="teal" onClick={deleteDishes}>Valider</Button>
                                            <Button colorScheme="red" onClick={handlePopup}>Annuler</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <CardBody>
                                <Text className="flex justify-between pt-3 px-3">
                                    <span className="text-base font-semibold">{menu.dishes}</span>
                                    <span className="text-base font-bold">{menu.price} €</span>
                                </Text>
                                <Flex justifyContent="space-between" className="px-3 pt-3">
                                    <Button colorScheme="teal">Modifier</Button>
                                    <Button colorScheme="red" onClick={handlePopup}>Supprimer</Button>
                                </Flex>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MenuList;
