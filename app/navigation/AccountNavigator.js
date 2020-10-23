import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MessageDetailScreen from "../screens/MessageDetailScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import ViewImageScreen from "../screens/ViewImageScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="MyListings" component={MyListingsScreen} />
    <Stack.Screen name="MessageDetails" component={MessageDetailScreen} />
    <Stack.Screen name="ImageViewMessage" component={ViewImageScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
