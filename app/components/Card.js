import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Feather } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function Card({ title, subTitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View>
          <Image
            style={styles.image}
            tint="light"
            preview={{ uri: thumbnailUrl }}
            uri={imageUrl}
          />
          <View style={styles.ImageOverlay}></View>
          <Feather
            name="eye"
            size={16}
            color="#fff"
            style={styles.imageLocationIcon}
          />
          <Text style={styles.ImageText}>{title}</Text>
        </View>
        <View style={styles.detailsContainer}>
          {/* <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text> */}
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    marginBottom: 7,
  },
  ImageOverlay: {
    width: "100%",
    height: 200,
    // marginRight: 8,
    // borderRadius: 10,
    position: "absolute",
    backgroundColor: "#333",
    opacity: 0.2,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 4,
    paddingBottom:3,
    left: 10,
    bottom: 10,
  },
  ImageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontWeight: "bold",
    fontSize: 16,
    left: 30,
    bottom: 10,
  },
});

export default Card;
