import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //If Already Login, automatically navigate to Map page
  useEffect(() => {
    const checkAlreadyLogin = async () => {
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");

        if (!refreshToken) {
          return;
        }

        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const { access_token, refresh_token } = response.data;
        await SecureStore.setItemAsync("accessToken", access_token);
        await SecureStore.setItemAsync("refreshToken", refresh_token);

        router.push("/home");
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    checkAlreadyLogin();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { access_token, refresh_token } = response.data;

        // Store access token securely
        await SecureStore.setItemAsync("accessToken", access_token);
        await SecureStore.setItemAsync("refreshToken", refresh_token);

        router.push("/home");
      } else {
        Alert.alert("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(
          `Login failed: ${
            error.response.data.message || "Please check your credentials."
          }`
        );
      } else if (error.request) {
        Alert.alert("Network error: Please check your internet connection.");
      } else {
        Alert.alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        placeholder="Username"
      />
      <View style={styles.passwordWrapper}>
        <TextInput
          style={{ flex: 1 }}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          secureTextEntry={!showPassword}
        />
        {showPassword ? (
          <FontAwesome5
            name="eye"
            size={20}
            color="black"
            onPress={() => setShowPassword(!showPassword)}
          />
        ) : (
          <FontAwesome5
            name="eye-slash"
            size={20}
            color="black"
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>

      <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}>
        <Text style={{ color: "#fff" }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoWrapper: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: "80%",
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d3d6db",
    borderRadius: 10,
    width: "90%",
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  passwordWrapper: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#d3d6db",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 50,
    width: "90%",
    backgroundColor: "#3e77ba",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
