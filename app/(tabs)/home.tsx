import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import app from "../../firebase/config";

export default function HomeScreen() {
  console.log(app);
  return (
    <View style={styles.container}>

       <Text style={styles.logo}>
        AI Notes
      </Text>

      <Text style={styles.subtitle}>
        Generate smart notes and quizzes using AI
      </Text>

            <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Upload Notes
        </Text>

        <Text style={styles.cardText}>
          Upload PDF notes and generate AI summaries.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/upload")}
        >
          <Text style={styles.buttonText}>
            Open Upload
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          AI Quiz
        </Text>
        <Text style={styles.cardText}>
          Practice MCQs generated from notes.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/quiz")}
        >
          <Text style={styles.buttonText}>
            Generate Quiz
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#94a3b8",
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 22,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
 elevation: 6,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  cardText: {
    color: "#cbd5e1",
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },

  button: {
    backgroundColor: "#4c7dff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

});