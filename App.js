import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import Icons from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import Login from "./src/components/Auth/Login";
import navigationTab from "./src/components/navigationTab/navigationTab";
import { navigate, navigationRef } from "./src/redux/navigationRoot";
import store from "./src/redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="MobileApp"
            component={navigationTab}
            options={{
              headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigate("Login");
                  }}
                >
                  <Icons
                    name="power-off"
                    size={26}
                    style={{ paddingRight: 15, color: "tomato" }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
