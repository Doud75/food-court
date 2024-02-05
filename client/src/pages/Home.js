import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Orders from "../components/home/Oders";
import Restaurants from "../components/home/Restaurants";

export default function Home() {
  return (
    <div className="flex mt-12">
      <Tabs isFitted className="w-full">
        <TabList>
          <Tab>Restaurants</Tab>
          <Tab>Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p="0px">
            <Restaurants />
          </TabPanel>
          <TabPanel p="0px">
            <Orders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
