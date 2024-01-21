import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import LoginCustomer from "../components/login/LoginCustomer";

export default function Connexion() {
  return (
    <div className="flex flex-col m-6 mt-12">
      <div className="flex flex-col text-center">
        <h1 className="text-xl ">Log In</h1>
        <span className="mt-8 text-gray-400 mx-12">
          Log in your account and order something to eat
        </span>
      </div>
      <div className="mt-44 ">
        <Tabs isFitted>
          <div className="mr-36">
            <TabList>
              <Tab>Customer</Tab>
              <Tab>Restaurateur</Tab>
            </TabList>
          </div>
          <TabPanels>
            <TabPanel p="0px">
              <LoginCustomer />
            </TabPanel>
            <TabPanel>
              <p>Restaurateur</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}
