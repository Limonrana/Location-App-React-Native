import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import FindPlaces from "../FindPlaces/FindPlaces";
import SharePlaces from "../SharePlaces/SharePlaces";

const Tab = createBottomTabNavigator();

const mapStateToProps = (state) => {
  return {
    countList: state.placeList,
  };
};

const navigationTab = ({ countList }) => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      activeBackgroundColor: "tomato",
      inactiveTintColor: "gray",
      labelPosition: "beside-icon",
      labelStyle: {
        fontSize: 16,
      },
    }}
  >
    <Tab.Screen
      name="Share Places"
      component={SharePlaces}
      options={{
        tabBarLabel: "Share Places",
        tabBarIcon: ({ color, size }) => (
          <Icons name="share-social" color={color} size={size} />
        ),
      }}
    />

    <Tab.Screen
      name="Find Places"
      component={FindPlaces}
      options={{
        tabBarLabel: "Find Places",
        tabBarIcon: ({ color, size }) => (
          <Icons name="md-map" color={color} size={size} />
        ),
        tabBarBadge: countList.length,
        tabBarBadgeStyle: {
          backgroundColor: "blue",
          color: "white",
        },
      }}
    />
  </Tab.Navigator>
);

export default connect(mapStateToProps)(navigationTab);
