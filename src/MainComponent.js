import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import InputPlace from "./components/Input/InputPlace";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import PlaceList from "./components/PlaceList/PlaceList";
import { addPlace, removePlace } from "./redux/actionCreator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#ffffff",
  },
});

const mapStateToProps = (state) => {
  return {
    placeList: state.placeList,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    addPlaces: (place) => dispatch(addPlace(place)),
    removePlaces: (key) => dispatch(removePlace(key)),
  };
};

const MainComponent = ({ placeList, addPlaces, removePlaces }) => {
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [seletcedPlace, setSeletcedPlace] = useState(null);

  const handleInput = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    if (inputValue !== "") {
      addPlaces({
        key: Math.random().toString(),
        value: inputValue,
        imageLink: {
          uri:
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        },
      });
      setInputValue("");
    }
  };

  const handleSelectedPlace = (key) => {
    const place = placeList.find((item) => item.key === key);
    setSeletcedPlace(place);
  };

  const handleDeteteItem = (key) => {
    removePlaces(key);
    setSeletcedPlace(null);
  };
  const handleHideModal = () => {
    setSeletcedPlace(null);
  };

  let placeModel = null;
  if (seletcedPlace !== null) {
    placeModel = (
      <PlaceDetails
        place={seletcedPlace}
        handleHideModal={handleHideModal}
        handleDeteteItem={handleDeteteItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      {placeModel}
      <InputPlace
        InputValue={inputValue}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      <PlaceList placeList={placeList} onItemPress={handleSelectedPlace} />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(MainComponent);
