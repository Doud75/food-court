import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import RestaurantOrders from "../components/home-restaurant/RestaurantOrders";
import MenuHandler from "../components/home-restaurant/MenuHandler";

export default function HomeRestaurant() {
  return (
    <div className="flex mt-12">
      <Tabs isFitted className="w-full">
        <TabList>
          <Tab>Menu</Tab>
          <Tab>Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0px">
            <MenuHandler />
          </TabPanel>
          <TabPanel p="0px">
            <RestaurantOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
