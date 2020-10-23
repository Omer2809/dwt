import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import Home from "../components/home";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ImageView" component={ViewImageScreen} />
    <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
