import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import ViewImageScreen from "../screens/ViewImageScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import MessagesScreen from "../screens/MessagesScreen";
import MyListingsScreen from "../screens/MyListingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
// import Home from "../components/home";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingsScreen} />
    {/* <Stack.Screen name="Home" component={Home} /> */}
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
    <Stack.Screen name="ImageView" component={ViewImageScreen} />
    <Stack.Screen name="ListingEdit" component={ListingEditScreen} />
    <Stack.Screen
      name="MyListings"
      component={MyListingsScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="Saved"
      component={FavoritesScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
