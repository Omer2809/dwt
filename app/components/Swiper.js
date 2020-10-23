import React from 'react';
import { View, StyleSheet, Dimensions, Image } from require("react-native");
import { ScrollView } from "react-native-gesture-handler";

const Swiper = () => {
  return (
    <View style={styles.container}>
      <ScrollView snapToInterval={width} decelerationRate="fast" horizontal>
        {assets.map((source) => (
          <View key={source} style={styles.picture}>
            <Image style={styles.image} {...{ source }} />
          </View>
        ))}
      </ScrollView>{" "}
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default Swiper;
