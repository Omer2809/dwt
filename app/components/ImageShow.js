import React, { useRef,useState } from "react";
import { View, StyleSheet, ScrollView,TouchableWithoutFeedback,
  Alert } from "react-native";
import { Image } from "react-native-expo-image-cache";
import colors from "../config/colors";

function ImageShow({ images = [],onRemoveImage }) {
  const scrollView = useRef();
  
  const handlePress = (url) => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => onRemoveImage(url) },
      { text: "No" },
    ]);
  };

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {images.map((image) => (
            <View key={image.url} style={styles.imageTop}>
              <TouchableWithoutFeedback onPress={()=>handlePress(image.url)}>
                <View style={styles.Imagecontainer}>
                  <Image
                    style={styles.image}
                    tint="light"
                    preview={{ uri: image.thumbnailUrl }}
                    uri={image.url}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageTop: {
    marginRight: 10,
  },
  Imagecontainer: {
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageShow;
