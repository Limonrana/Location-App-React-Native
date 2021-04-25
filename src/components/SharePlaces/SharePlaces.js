import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { connect } from "react-redux";
import { addPlace } from "../../redux/actionCreator";
import InputPlace from "../Input/InputPlace";
import PickImage from "../PickImage/PickImage";
import Spinner from "../Spinner/Spinner";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomColor: "#ffffff",
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    addPlaces: (place) => dispatch(addPlace(place)),
  };
};

const SharePlaces = ({ addPlaces, navigation, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState("");

  const handleInput = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      alert("OPPS! Places can not be empty!");
    } else if (image === "") {
      alert("OPPS! Image can not be empty!");
    } else {
      addPlaces({
        key: Math.random().toString(),
        value: inputValue,
        image: image,
      });
      setInputValue("");
      setImage("");
    }
  };

  // JSX Code
  let sharePlaceView = null;
  if (isLoading) {
    sharePlaceView = <Spinner color="tomato" />;
  } else {
    sharePlaceView = (
      <>
        <PickImage image={image} setImage={setImage} />
        <View style={styles.container}>
          <InputPlace InputValue={inputValue} handleInput={handleInput} />
          <Button title="Add New Place" onPress={() => handleSubmit()} />
        </View>
      </>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={{ width: "100%" }}>{sharePlaceView}</ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(SharePlaces);
