import React from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppNavigator from "./AppNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from "./AccountNavigator";
import { DrawerContent } from "../screens/DrawerContent";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={AppNavigator} />
      <Drawer.Screen name="Feed" component={FeedNavigator} />
      <Drawer.Screen name="ListingNew" component={ListingEditScreen} />
      <Drawer.Screen name="Account" component={AccountNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DrawerNavigator;
