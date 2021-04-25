import React from "react";
import { FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";

const PlaceList = ({ placeList, onItemPress }) => (
  <FlatList
    style={{ width: "100%" }}
    data={placeList}
    renderItem={(info) => (
      <ListItem
        placeName={info.item.value}
        image={info.item.image}
        onItemPress={() => onItemPress(info.item.key)}
      />
    )}
  />
);

export default PlaceList;
