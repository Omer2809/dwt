import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getListingsApi.request();
    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing._id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"Rs." + item.price}
              imageUrl={
                item.images[0]
                  ? item.images[0].url
                  : "https://res.cloudinary.com/deqjuoahl/image/upload/v1602501994/dev_setups/iwhu97c1fezqwfwf0nfk.png"
              }
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0] && item.images[0].thumbnailUrl}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 5,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
