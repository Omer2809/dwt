import React from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import {
  TouchableOpacity
} from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";

import routes from "../navigation/routes";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import Text from "../components/Text";

function MessageDetailsScreen({ route, navigation }) {
  const message = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 120}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routes.IMAGE_VIEW_MESSAGE, message.listing)
        }
      >
        <Image
          style={styles.image}
          preview={{ uri: message.listing.images[0].thumbnailUrl }}
          tint="light"
          uri={message.listing.images[0].url}
        />
        <View style={styles.ImageOverlay}></View>
        <Text style={styles.ImageDescription}>
          <Text style={styles.ImageText}>{message.listing.title}</Text>
          {`\n`}
          {message.listing.description.substring(0, 80)}...
        </Text>
      </TouchableOpacity>
      <View style={styles.ImagePrice}>
        <Text style={{ color: colors.white, fontSize: 14 }}>
          Rs.{message.listing.price}
        </Text>
      </View>
      <View style={styles.userContainer}>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 10,
            fontWeight: "bold",
          }}
        >
          Message from {message.fromUser.name}:
        </Text>
        <Text>" {`${message.content.substring(0, 150)}`} ..."</Text>
        <ContactSellerForm listing={message.listing} btnName="Send Reply" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  ImageOverlay: {
    width: "100%",
    height: 270,
    position: "absolute",
    backgroundColor: "#333",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    opacity: 0.3,
  },

  ImageText: {
    position: "absolute",
    color: "#fff",
    // textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 22,
  },
  ImagePrice: {
    position: "absolute",
    backgroundColor: colors.primary,
    right: 20,
    // top: 50,
    // right: 135,
    top: 250,
    zIndex: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 40,
  },
  ImageDescription: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 18,
    paddingRight: 40,
    left: 30,
    bottom: 25,
  },
  image: {
    width: "100%",
    height: 270,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  userContainer: {
    marginHorizontal: 20,
  },
});

export default MessageDetailsScreen;
