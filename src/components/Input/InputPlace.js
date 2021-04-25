import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  inputView: {
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 10,
    width: "100%",
  },
});

const InputPlace = ({ InputValue, handleInput }) => (
  <View style={styles.inputView}>
    <TextInput
      style={{
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "green",
        padding: 7,
      }}
      onChangeText={(text) => handleInput(text)}
      value={InputValue}
      placeholder="Add your place..."
    />
  </View>
);

export default InputPlace;
