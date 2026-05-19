import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { getAuth }
from "firebase/auth";

import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/config";

export default function QuizScreen() {

  const [selectedAnswers, setSelectedAnswers] =
    useState<any>({});

  const [score, setScore] =
    useState<number | null>(null);

  const questions = [

    {
      question: "What is AI?",

      options: [
        "Artificial Intelligence",
        "Automatic Internet",
        "Advanced Input",
        "None",
      ],

      answer: "Artificial Intelligence",
    },

    {
      question: "AI helps in?",

      options: [
        "Automation",
        "Cooking",
        "Driving only",
        "None",
      ],

      answer: "Automation",
    },

    {
      question: "Machine Learning is?",

      options: [
        "Branch of AI",
        "Operating System",
        "Database",
        "None",
      ],

      answer: "Branch of AI",
    },

  ];

  const handleSubmitQuiz =
    async () => {

    let totalScore = 0;

    questions.forEach((item, index) => {

      if (
        selectedAnswers[index] ===
        item.answer
      ) {
        totalScore++;
      }

    });

    try {

      const auth = getAuth();

      const user =
        auth.currentUser;

      await addDoc(
        collection(db, "quizzes"),

        {
          userEmail:
            user?.email,

          score: totalScore,

          totalQuestions:
            questions.length,

          createdAt:
            serverTimestamp(),
        }
      );

      setScore(totalScore);

      Alert.alert(
        "Success 🚀",
        "Quiz saved successfully"
      );

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Quiz not saved"
      );
    }
  };

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        AI Quiz
      </Text>

      {questions.map((item, index) => (

        <View
          key={index}
          style={styles.card}
        >

          <Text style={styles.question}>
            {index + 1}. {item.question}
          </Text>

          {item.options.map((option, i) => (

            <TouchableOpacity
              key={i}

              style={[
                styles.optionButton,

                selectedAnswers[index] ===
                  option && {
                  backgroundColor:
                    "#4c7dff",
                },

                score !== null &&
                option === item.answer && {
                  backgroundColor:
                    "#4CAF50",
                },

                score !== null &&
                selectedAnswers[index] ===
                  option &&
                option !== item.answer && {
                  backgroundColor:
                    "#ff4d4d",
                },
              ]}

              onPress={() => {

                if (score !== null)
                  return;

                setSelectedAnswers({
                  ...selectedAnswers,
                  [index]: option,
                });

              }}
            >

              <Text
                style={[
                  styles.optionText,

                  selectedAnswers[index] ===
                    option && {
                    color: "white",
                    fontWeight: "bold",
                  },
                ]}
              >
                {option}
              </Text>

            </TouchableOpacity>

          ))}

        </View>

      ))}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitQuiz}
      >

        <Text style={styles.submitButtonText}>
          Submit Quiz
        </Text>

      </TouchableOpacity>

      {score !== null && (

        <View style={styles.scoreBox}>

          <Text style={styles.scoreText}>
            Your Score:
            {score}/{questions.length}
          </Text>

          <Text style={styles.resultMessage}>

            {score ===
            questions.length
              ? "Excellent 🔥"
              : score >= 2
              ? "Good Job 👍"
              : "Keep Practicing 😄"}

          </Text>

        </View>

      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  heading: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    color: "white",
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

  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },

  optionButton: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 16,
    color: "#e2e8f0",
    fontWeight: "500",
  },

  submitButton: {
    backgroundColor: "#4c7dff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  scoreBox: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#22c55e",
  },

  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22c55e",
    textAlign: "center",
  },

  resultMessage: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },

});