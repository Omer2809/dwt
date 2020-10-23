import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";

import { Image } from "react-native-expo-image-cache";
import routes from "../navigation/routes";
import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import useAuth from "../auth/useAuth";

function MessageDetailsScreen({ route, navigation }) {
  const message = route.params;
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      style={{ flex: 1, backgroundColor: "red" }}
    >
      <View style={{ height: "100%" }}>
        {/* <ScrollView style={{ height:"100%",color:"#333",backgroundColor:"orange" }}> */}
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
        </TouchableOpacity>
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.title}>{message.listing.title}</Text>
          <Text style={styles.price}>
            Price : <Text>Rs.{message.listing.price}</Text>
          </Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/mosh.jpg")}
              title={`Message from : ${message.fromUser.name}`}
              subTitle={`${message.fromUser.email}`}
            />
          </View>
          <Text style={styles.price}>Message : {`${message.content}`}...</Text>
          <ContactSellerForm listing={message.listing} btnName="Send Reply" />
        </ScrollView>
      </View>

      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
    height: "100%",
    flex: 1,
    backgroundColor: "yellow",
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
    flex: 1,
  },
});

export default MessageDetailsScreen;
