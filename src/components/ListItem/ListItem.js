import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    padding: 10,
    backgroundColor: "#eee",
    margin: 5,
    flexDirection: "row",
  },
});

const ListItem = ({ placeName, image, onItemPress }) => (
  <TouchableOpacity onPress={onItemPress}>
    <View style={styles.listItem}>
      <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
      <Text style={{ marginLeft: 15, marginTop: 15 }}>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

export default ListItem;
