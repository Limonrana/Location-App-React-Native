import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { fatchPlace, removePlace } from "../../redux/actionCreator";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import PlaceList from "../PlaceList/PlaceList";
import Spinner from "../Spinner/Spinner";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomColor: "#ffffff",
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ffffff",
  },
  emptyPlace: {
    fontSize: 25,
    fontWeight: "700",
  },
});

const mapStateToProps = (state) => {
  return {
    placeList: state.placeList,
    isLoading: state.isLoading,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    removePlaces: (key) => dispatch(removePlace(key)),
    fatchPlaces: () => dispatch(fatchPlace()),
  };
};

const FindPlaces = ({ placeList, fatchPlaces, removePlaces, isLoading }) => {
  const [seletcedPlace, setSeletcedPlace] = useState(null);

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

  useEffect(() => {
    fatchPlaces();
  }, []);

  // JSX Code

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

  let PlaceListView = null;
  let containerStyle = null;
  if (isLoading) {
    PlaceListView = <Spinner color="tomato" />;
    containerStyle = styles.container;
  } else {
    if (placeList.length !== 0) {
      PlaceListView = (
        <PlaceList placeList={placeList} onItemPress={handleSelectedPlace} />
      );
      containerStyle = styles.container;
    } else {
      PlaceListView = (
        <Text style={styles.emptyPlace}>OPPS! No more find places!</Text>
      );
      containerStyle = styles.containerEmpty;
    }
  }

  return (
    <View style={containerStyle}>
      {placeModel}
      {PlaceListView}
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToprops)(FindPlaces);
