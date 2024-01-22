import React from "react";
import { getFetch } from "../../utils/getFetch";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
export default function ListRestaurant() {
  const [restaurants, setRestaurants] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFetch(`/restaurants`);
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Restaurant</Th>
              <Th>Category</Th>
            </Tr>
          </Thead>
          <Tbody>
            {restaurants.map((restaurant) => (
              <Tr key={restaurant.id}>
                <Td>{restaurant.name}</Td>
                <Td>{restaurant.category}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
