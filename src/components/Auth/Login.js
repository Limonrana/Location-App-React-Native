import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { tryAuth } from "../../redux/actionCreator";
import Spinner from "../Spinner/Spinner";

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attempAuth: (email, password, mode) =>
      dispatch(tryAuth(email, password, mode)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  inputType: {
    padding: 10,
    paddingLeft: 25,
    borderColor: "#fff",
    borderWidth: 2,
    marginBottom: 10,
    width: "80%",
    borderRadius: 20,
    color: "#fff",
    fontSize: 16,
  },
  authBtn: {
    borderColor: "#fff",
    borderWidth: 2,
    width: 250,
    padding: 12,
    marginTop: "5%",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    alignItems: "center",
    fontSize: 18,
    color: "tomato",
  },
  logos: {
    fontSize: 35,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  switchBTNGroup: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  switchBtn: {
    width: "35%",
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  switchBTNBorder: {
    width: "35%",
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: "white",
    alignItems: "center",
  },
});

const Login = ({ attempAuth, isLoading }) => {
  const [authState, setAuthState] = useState({
    mode: "login",
    inputs: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isFocused = useIsFocused();

  useEffect(() => {
    setAuthState({
      ...authState,
      inputs: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    });
  }, [isFocused]);

  const handleInput = (value, name) => {
    setAuthState({
      ...authState,
      inputs: {
        ...authState.inputs,
        [name]: value,
      },
    });
  };

  const handleSubmit = () => {
    const Regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const email = authState.inputs.email;
    const password = authState.inputs.password;
    const confirmPassword = authState.inputs.confirmPassword;
    if (email !== "" && password !== "") {
      if (Regex.test(email)) {
        if (password.length >= 6) {
          if (authState.mode === "login") {
            attempAuth(email, password, "login");
          } else {
            if (password === confirmPassword) {
              attempAuth(email, password, "signup");
            } else {
              alert("OPPS! Password doesn't match!");
            }
          }
        } else {
          alert("OPPS! Password should be at least 6 characters!");
        }
      } else {
        alert("OPPS! Invalid email address!");
      }
    } else {
      alert("Email or Password can not be empty!");
    }
  };

  const handleMode = () => {
    setAuthState({
      ...authState,
      mode: authState.mode === "login" ? "signup" : "login",
    });
  };

  // JSX Code
  let confirmField = null;
  if (authState.mode !== "login") {
    confirmField = (
      <TextInput
        style={styles.inputType}
        secureTextEntry={true}
        placeholder="Confirm Password"
        placeholderTextColor="#fff"
        value={authState.inputs.confirmPassword}
        onChangeText={(value) => handleInput(value, "confirmPassword")}
      />
    );
  }

  const spinner = <Spinner color="white" />;
  const loginView = (
    <>
      <Text style={styles.logos}>MOBILE APP</Text>
      <View style={styles.switchBTNGroup}>
        <TouchableOpacity
          style={
            authState.mode == "login"
              ? styles.switchBTNBorder
              : styles.switchBtn
          }
          onPress={() => handleMode()}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#ffffff" }}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            authState.mode == "signup"
              ? styles.switchBTNBorder
              : styles.switchBtn
          }
          onPress={() => handleMode()}
        >
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#ffffff" }}>
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.inputType}
        placeholder="Email address"
        placeholderTextColor="#fff"
        value={authState.inputs.email}
        onChangeText={(value) => handleInput(value, "email")}
      />
      <TextInput
        style={styles.inputType}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#fff"
        value={authState.inputs.password}
        onChangeText={(value) => handleInput(value, "password")}
      />
      {confirmField}
      <TouchableOpacity style={styles.authBtn} onPress={() => handleSubmit()}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "tomato" }}>
          {authState.mode === "login" ? "Login" : "Sign Up"}
        </Text>
      </TouchableOpacity>
    </>
  );
  return (
    <View style={styles.container}>{isLoading ? spinner : loginView}</View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
