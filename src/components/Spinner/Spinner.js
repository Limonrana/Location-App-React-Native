import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

const Spinner = ({ color }) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Spinner;
