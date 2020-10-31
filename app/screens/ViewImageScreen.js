// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Image } from "react-native-expo-image-cache";

// import colors from "../config/colors";
// import routes from "../navigation/routes";
// import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

// function ViewImageScreen({ route, navigation }) {
//   const listing = route.params;

//   return (
//     <View style={styles.container}>
//       <TouchableWithoutFeedback
//       // onPress={() => navigation.navigate(routes.LISTING_DETAILS, listing)}

//       onPress={() => navigation.goBack()}
//         style={styles.closeIcon}
//       >
//         {/* <View > */}
//           <MaterialCommunityIcons name="close" color="white" size={35} />
//         {/* </View> */}
//       </TouchableWithoutFeedback>
//       <View style={styles.deleteIcon}>
//         {/* <MaterialCommunityIcons
//           name="trash-can-outline"
//           color="white"
//           size={35}
//         /> */}
//       </View>
//       <Image
//         resizeMode="contain"
//         style={styles.image}
//         preview={{ uri: listing.images[0].thumbnailUrl }}
//         tint="light"
//         uri={listing.images[0].url}
//       />
//       {/* <Image
//         resizeMode="contain"
//         style={styles.image}
//         source={require("../assets/chair.jpg")}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   closeIcon: {
//     // position: "absolute",
//     color: "white",
//     zIndex: 1000,
//     marginTop:40,
//     // top: 40,
//     left: 30,
//   },
//   container: {
//     backgroundColor: colors.black,
//     flex: 1,
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: 40,
//     right: 30,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default ViewImageScreen;

import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import routes from "../navigation/routes";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

function ViewImageScreen({ route, navigation }) {
  const listing = route.params;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => navigation.goBack()}
        style={styles.closeIcon}
      >
        <MaterialCommunityIcons name="close" color="white" size={35} />
      </TouchableWithoutFeedback>
      <View style={styles.deleteIcon}>
      </View>
      <ScrollView
        snapToInterval={width}
        decelerationRate="fast"
        disableIntervalMomentum
        horizontal
      >
        {listing.images.map((image) => (
          <View key={image.url} style={styles.picture}>
            <Image
              resizeMode="contain"
              style={styles.image}
              tint="light"
              preview={{ uri: image.thumbnailUrl }}
              uri={image.url}
            />
          </View>
        ))}
      </ScrollView>

      {/* <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/chair.jpg")}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    // position: "absolute",
    color: "white",
    zIndex: 1000,
    marginTop: 40,
    // top: 40,
    left: 30,
  },
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  deleteIcon: {
    position: "absolute",
    top: 40,
    right: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
    paddingBottom:70
  },
});

export default ViewImageScreen;
