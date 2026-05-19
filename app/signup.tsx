import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";

import { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import app from "../firebase/config";

const auth = getAuth(app);

export default function SignupScreen() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      Alert.alert(
  "Success",
  "Account created successfully 🚀"
);

router.replace("/(tabs)/home");

    } catch (error: any) {

      Alert.alert(
        "Signup Error",
        error.message
      );
    }
  };

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        AI Notes
      </Text>

      <Text style={styles.subtitle}>
        Create your account 🚀
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
        onPress={handleSignup}
      >

        <Text style={styles.buttonText}>
          Sign Up
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    padding: 25,
  },

  logo: {
    fontSize: 40,
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
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 14,
    marginBottom: 18,
    color: "white",
    fontSize: 16,
  },

  button: {
    backgroundColor: "#4c7dff",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});