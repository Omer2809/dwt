import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  RefreshControl,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import _ from "lodash/array";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";

import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import SearchBox from "../components/searchBox";
import getSearchData from "../utility/getSearchData";
import useAuth from "../auth/useAuth";
import getTrendingData from "../utility/getTrendingData";

function ListingsScreen({ route, navigation }) {
  const { user } = useAuth();
  const getListingsApi = useApi(listingsApi.getListings);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    getListingsApi.request();
    setRefreshing(false);
    setCount(count + 1);
    const unsubscribe = navigation.addListener("focus", () => {
    });
    return unsubscribe;
  }, [refreshing, route.params]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        <ScrollView
          style={{ flexGrow: 1, height: "100%" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        >
          <View>
            <ImageBackground
              source={require("../assets/background.jpg")}
              style={{ width: "100%", height: 270 }}
              imageStyle={{ borderBottomRightRadius: 65 }}
            >
              <View style={styles.DarkOverlay}></View>
              <View style={styles.searchContainer}>
                <Text style={styles.UserGreet}>
                  Hi {user.name.trim().split(" ")[0]}
                </Text>
                <Text style={styles.UserText}>
                  What would you like to buy today?
                </Text>
              </View>
              <View>
                <SearchBox value={searchQuery} onChangeText={handleSearch} />
                <Feather
                  name="search"
                  size={22}
                  color="#666"
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 60,
                    opacity: 0.6,
                  }}
                />
              </View>
              <Feather
                name="menu"
                size={22}
                color="#fff"
                style={{ position: "absolute", top: 40, left: 16 }}
                onPress={() => navigation.openDrawer()}
              />

              <Feather
                name="bell"
                size={22}
                color="#fff"
                style={{ position: "absolute", top: 40, right: 30 }}
                onPress={() => navigation.navigate(routes.MESSAGES)}
              />
            </ImageBackground>
          </View>

          {!searchQuery && (
            <>
              {getListingsApi.data && getListingsApi.data.length !== 0 && (
                <View style={{ paddingVertical: 15, paddingLeft: 20 }}>
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    Top Trending
                  </Text>
                </View>
              )}
              <View>
                <FlatList
                  horizontal
                  data={getTrendingData(getListingsApi.data)}
                  keyExtractor={(listing) => listing._id.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ paddingLeft: 16 }}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate(routes.LISTING_DETAILS, {
                              listing: item,
                              data: getTrendingData(getListingsApi.data),
                            })
                          }
                        >
                          <Image
                            tint="light"
                            preview={{ uri: item.images[0].thumbnailUrl }}
                            uri={item.images[0].url}
                            style={{
                              width: 150,
                              marginRight: 8,
                              height: 250,
                              borderRadius: 10,
                            }}
                          />
                          <View style={styles.ImageOverlay}></View>
                          <Feather
                            name="map-pin"
                            size={16}
                            color="#fff"
                            style={styles.imageLocationIcon}
                          />
                          <Text style={styles.ImageText}>{item.title}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          )}
          <View>
            <Text style={{ padding: 20, fontSize: 22, fontWeight: "bold" }}>
              {searchQuery
                ? getSearchData(searchQuery, getListingsApi.data).length === 0
                  ? "No Products Found..."
                  : "Search Result..."
                : "Top Products"}
            </Text>
            {getListingsApi.error && (
              <View
                style={{
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                }}
              >
                <AppText>Couldn't retrieve the listings.</AppText>
                <Button title="Retry" onPress={getListingsApi.request} />
              </View>
            )}
            <FlatList
              data={getSearchData(searchQuery, getListingsApi.data)}
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
                  // onBookMark={handleBookMark}
                  itemId={item._id}
                  userId={user.userId}
                  count={count}
                  onPress={() =>
                    navigation.navigate(routes.LISTING_DETAILS, {
                      listing: item,
                      data: getTrendingData(getListingsApi.data),
                    })
                  }
                  thumbnailUrl={item.images[0] && item.images[0].thumbnailUrl}
                />
              )}
            />
          </View>
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  DarkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 270,
    backgroundColor: "#000",
    opacity: 0.2,
    borderBottomRightRadius: 65,
  },
  searchContainer: {
    paddingTop: 100,
    paddingLeft: 16,
  },
  UserGreet: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  UserText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
  },
  ImageOverlay: {
    width: 150,
    height: 250,
    marginRight: 8,
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "#222",
    opacity: 0.2,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 4,
    left: 10,
    bottom: 10,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
    left: 30,
    bottom: 10,
  },
});

export default ListingsScreen;
