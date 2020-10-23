import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import useAuth from "../auth/useAuth";
import myApi from "../api/my";
import Screen from "../components/Screen";
import Text from "../components/Text";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import ListItemEditAction from "../components/lists/ListItemEditAction";
import ActivityIndicator from "../components/ActivityIndicator";

function MyListingsScreen({ navigation }) {
  // const { user } = useAuth();
  const getMyListingsApi = useApi(myApi.getMyListings);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyListingsApi.request();
    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  const handleDelete = async (listing) => {
    const originalData = getMyListingsApi.data;
    const listings = originalData.filter((l) => l._id !== listing._id);
    getMyListingsApi.setData(listings);

    const result = await listingsApi.deleteListing(listing._id);

    if (!result.ok) {
      getMyListingsApi.setData(originalData);
      return alert("Could not delete the listing");
    }
  };

  return (
    <>
      <ActivityIndicator visible={getMyListingsApi.loading} />
      <Screen>
        {getMyListingsApi.error && (
          <>
            <AppText>Couldn't retrieve your listings.</AppText>
            <Button title="Retry" onPress={getMyListingsApi.request} />
          </>
        )}
        {getMyListingsApi.data.length === 0 ? (
          <Text style={{ paddingLeft: 20 }}>
            You Don't have Any Listings Yet...
          </Text>
        ) : (
          <>
            <Text style={{ paddingLeft: 20, marginBottom: 10 }}>
              Showing {getMyListingsApi.data.length} items in your listings...
            </Text>
            <FlatList
              data={getMyListingsApi.data}
              keyExtractor={(listing) => listing._id}
              renderItem={({ item }) => (
                <ListItem
                  title={item.title}
                  subTitle={"Rs." + item.price}
                  imageUrl={item.images[0] && item.images[0].url}
                  onPress={() =>
                    navigation.navigate(routes.LISTING_DETAILS, item)
                  }
                  thumbnailUrl={item.images[0] && item.images[0].thumbnailUrl}
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
                  )}
                  renderLeftActions={() => (
                    <ListItemEditAction
                      onPress={() =>
                        navigation.navigate(routes.LISTING_EDIT, item)
                      }
                    />
                  )}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default MyListingsScreen;
