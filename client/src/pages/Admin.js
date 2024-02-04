import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";
import ListRestaurant from "../components/admin/ListRestaurant";

export default function Admin() {
  const navigate = useNavigate();

  const handleAddRestaurantClick = () => {
    navigate("/create-restaurant");
  };

  return (
    <div className="flex flex-col m-6">
      <Tabs align="center">
        <div>
          <TabList className="place-content-center ">
            <Tab isDisabled>Restaurateur</Tab>
          </TabList>
        </div>
        <TabPanels>
          <TabPanel p="0px">
            <ListRestaurant />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="flex mt-12">
        <Button
          variant="solid"
          colorScheme="teal"
          size="lg"
          width="100%"
          onClick={handleAddRestaurantClick}
        >
          Add Restaurant
        </Button>
      </div>
    </div>
  );
}
