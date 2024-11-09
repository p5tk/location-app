import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
// import { locations } from "../locations";
import MapView, { Marker, Callout } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";

const home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");

        if (token) {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/locations`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setLocations(response.data);
        } else {
          setError("No token found.");
        }
      } catch (err) {
        console.error("Error fetching locations:", err);
        setError("Failed to fetch locations.");
      }
    };

    fetchLocations();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    router.push("/");
  };

  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />

      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.7895414,
            longitude: -122.4127317,
            latitudeDelta: 0.02, // Adjust for zoom level
            longitudeDelta: 0.02, // Adjust for zoom level
          }}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            >
              <Callout>
                <View style={styles.callout}>
                  <Text style={styles.description}>
                    {location.formattedAddress}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
    </>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  logoutBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 200,
  },
});
