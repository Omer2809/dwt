import React from "react";
import { StyleSheet, TextInput } from "react-native";

const SearchBox = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchBox}
      placeholder="search product..."
      placeholderTextColor="#666"
      onChangeText={(text) => onChangeText(text)}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
  },
});

export default SearchBox;
