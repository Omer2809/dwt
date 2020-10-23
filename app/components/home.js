import React from "react";
import {
  View,
  StyleSheet,
  Text,
  // Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import routes from "../navigation/routes";

function Home({ listings, navigation }) {
  return (
    <View>
      <View>
        <ImageBackground
          source={require("../assets/background.jpg")}
          style={{ width: "100%", height: 270 }}
          imageStyle={{ borderBottomRightRadius: 65 }}
        >
          <View style={styles.DarkOverlay}></View>
          <View style={styles.searchContainer}>
            <Text style={styles.UserGreet}>Hi Omer,</Text>
            <Text style={styles.UserText}>
              What would you like to buy today?
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.searchBox}
              placeholder="search product..."
              placeholderTextColor="#666"
            ></TextInput>
            <Feather
              name="search"
              size={22}
              color="#666"
              style={{ position: "absolute", top: 30, right: 60, opacity: 0.6 }}
            />
          </View>
          <Feather
            name="menu"
            size={22}
            color="#fff"
            style={{ position: "absolute", top: 40, left: 16 }}
          />
          <Feather
            name="bell"
            size={22}
            color="#fff"
            style={{ position: "absolute", top: 40, right: 30 }}
          />
        </ImageBackground>
      </View>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>Top Trending</Text>
        </View>
        <View>
          <FlatList
            horizontal
            data={listings}
            keyExtractor={(listing) => listing._id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 20, paddingLeft: 16 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.LISTING_DETAILS, item)
                    }
                  >
                    <Image
                      // style={styles.item}
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
            // <Card
            //   title={item.title}
            //   subTitle={"Rs." + item.price}
            //   imageUrl={
            //     item.images[0]
            //       ? item.images[0].url
            //       : "https://res.cloudinary.com/deqjuoahl/image/upload/v1602501994/dev_setups/iwhu97c1fezqwfwf0nfk.png"
            //   }
            //   onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
            //   thumbnailUrl={item.images[0] && item.images[0].thumbnailUrl}
            // />
            // )}
            // refreshing={refreshing}
            // onRefresh={() => setRefreshing(true)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#000",
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

export default Home;
