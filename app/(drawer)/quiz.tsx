import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import { useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db }
from "../../firebase/config";

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

    setScore(totalScore);

    try {

  await addDoc(
    collection(db, "quizzes"),

    {
      score: totalScore,

      totalQuestions:
        questions.length,

      createdAt:
        serverTimestamp(),
    }
  );

  console.log(
    "Quiz Saved 🚀"
  );

} catch (error) {

  console.log(error);
}
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        AI Quiz
      </Text>

      <LinearGradient
        colors={["#4c7dff", "#7c4dff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >

        <Ionicons
          name="bulb-outline"
          size={42}
          color="white"
        />

        <Text style={styles.heroTitle}>
          AI Quiz Challenge 🚀
        </Text>

        <Text style={styles.heroText}>
          Test your knowledge with smart AI questions.
        </Text>

      </LinearGradient>

      {questions.map((item, index) => (

        <LinearGradient
          key={index}
          colors={["#1e293b", "#111827"]}
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
                    "#22c55e",
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

        </LinearGradient>

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

        <>

          <View style={styles.scoreBox}>

            <Text style={styles.scoreText}>
              Your Score: {score}/
              {questions.length}
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

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {

              setSelectedAnswers({});
              setScore(null);

            }}
          >

            <Text style={styles.retryText}>
              Try Again
            </Text>

          </TouchableOpacity>

        </>

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
    marginTop: 60,
    marginBottom: 20,
    color: "white",
  },

  heroCard: {
    padding: 24,
    borderRadius: 24,
    marginBottom: 25,
  },

  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  heroText: {
    color: "#e2e8f0",
    marginTop: 10,
    lineHeight: 24,
    fontSize: 15,
  },

  card: {
    backgroundColor: "transparent",
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
    backgroundColor: "#0f172a",
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
    marginBottom: 20,
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

  retryButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 60,
    borderWidth: 1,
    borderColor: "#4c7dff",
  },

  retryText: {
    color: "#4c7dff",
    fontSize: 17,
    fontWeight: "bold",
  },

});