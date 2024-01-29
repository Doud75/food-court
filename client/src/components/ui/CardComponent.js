import React, {useState, useEffect} from 'react';
import { getFetch } from '../utils/getFetch';
import { Card, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Restaurants(){
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await getFetch(`/restaurants`);
              setRestaurants(data);
            } catch (error) {
              console.error("Error fetching menus:", error);
            }
          };
      
          fetchData();
    }, []);

    return (
        <>
            <nav className="p-6">
            </nav>
            <div className='p-5'>
                {
                    restaurants.map((restaurant) =>
                        <Link key={restaurant.id} to={"/Restaurants/" + restaurant.id + "/Menus"}>
                            <Card className="mb-5" borderRadius="lg" overflow="hidden">
                                <Image
                                    className='h-40'
                                    src="https://source.unsplash.com/bol-de-salades-de-legumes-IGfIGP5ONV0"
                                    alt="Green double couch with wooden legs"
                                />
                                <Text className="pt-3 p-3">
                                    <div className="w-4/6">
                                        <h4 className="text-base font-semibold mb-2">{restaurant.name}</h4>
                                        <p className="line-clamp-2 text-sm">
                                            {restaurant.description}
                                        </p>
                                    </div>
                                </Text>
                            </Card>
                        </Link>
                    )
                }
            </div>
        </>
    );
};