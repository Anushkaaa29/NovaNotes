import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useState } from "react";

import { router } from "expo-router";

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import app from "../firebase/config";

import {
  Ionicons,
} from "@expo/vector-icons";

const auth = getAuth(app);

export default function LoginScreen() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

    if (
      !email ||
      !password
    ) {

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
        "Success",
        "Login successful 🚀"
      );

      router.replace(
        "/(tabs)/home"
      );

    } catch (error: any) {

      Alert.alert(
        "Login Error",
        error.message
      );
    }
  };

  const handleGoogleLogin =
    async () => {

    try {

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      Alert.alert(
        "Success 🚀",
        "Google Login Successful"
      );

      router.replace(
        "/(tabs)/home"
      );

    } catch (error: any) {

      Alert.alert(
        "Google Login Error",
        error.message
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        NovaNotes AI
      </Text>

      <Text style={styles.subtitle}>
        Welcome Back 👋
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        placeholderTextColor="#94a3b8"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >

        <Text style={styles.buttonText}>
          Login
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
      >

        <Ionicons
          name="logo-google"
          size={22}
          color="#0f172a"
        />

        <Text style={styles.googleText}>
          Continue with Google
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.push("/signup")
        }
      >

        <Text style={styles.signupText}>
          Don't have an account?
          {" "}
          Sign Up
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles =
  StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor:
      "#0f172a",
    justifyContent:
      "center",
    padding: 25,
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 18,
    marginBottom: 40,
  },

  input: {
    backgroundColor:
      "#1e293b",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  button: {
    backgroundColor:
      "#4c7dff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  googleButton: {
    backgroundColor:
      "white",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    justifyContent:
      "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },

  googleText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "bold",
  },

  signupText: {
    color: "#94a3b8",
    textAlign: "center",
    fontSize: 15,
  },

});