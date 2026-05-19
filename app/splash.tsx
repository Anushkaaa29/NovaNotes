import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useEffect } from "react";

import { router } from "expo-router";

export default function SplashScreen() {

  useEffect(() => {

    setTimeout(() => {

      router.replace("/");

    }, 2500);

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        AI Notes
      </Text>

      <Text style={styles.tagline}>
        Smart Notes & Quiz Generator
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#4c7dff",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
  },

  tagline: {
    marginTop: 10,
    fontSize: 18,
    color: "white",
  },

});