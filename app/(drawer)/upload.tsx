import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import { db } from "../../firebase/config";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  getAuth,
} from "firebase/auth";

import * as DocumentPicker from "expo-document-picker";

import { useState } from "react";

import { generateSummary } from "../../services/ai.js";

import { uploadPDF } from "../../services/api";

export default function UploadScreen() {

  const [fileName, setFileName] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const pickDocument = async () => {

    let result =
      await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

    if (!result.canceled) {

      setFileName(
        result.assets[0].name
      );

      const formData =
        new FormData();

      formData.append("pdf", {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: "application/pdf",
      } as any);

      try {

        const response =
          await uploadPDF(formData);

        if (response?.extractedText) {

          setNotes(
            response.extractedText
          );
        }

      } catch (error) {

        console.log(error);
      }
    }
  };

  const handleGenerateSummary =
  async () => {

  console.log(
    "BUTTON PRESSED"
  );

    try {

      setLoading(true);

      const result =
        await generateSummary(notes);

      setSummary(result);

      const auth = getAuth();

      const user =
        auth.currentUser;

      await addDoc(
        collection(db, "summaries"),

        {
          userEmail:
  user?.email || "guest@gmail.com",
  
          notes: notes,

          summary: result,

          createdAt:
            serverTimestamp(),
        }
      );

      Alert.alert(
        "Success 🚀",
        "Summary generated successfully"
      );

      setLoading(false);

    } catch (error) {

      console.log(
        "Firestore Error:",
        error
      );

      setLoading(false);
    }
  };

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        AI Notes 🚀
      </Text>

      <Text style={styles.subheading}>
        Upload notes and generate smart AI summaries instantly.
      </Text>

      <LinearGradient
        colors={["#4c7dff", "#7c4dff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >

        <Ionicons
          name="sparkles-outline"
          size={42}
          color="white"
        />

        <Text style={styles.heroTitle}>
          Smart AI Summary
        </Text>

        <Text style={styles.heroText}>
          Generate clean and concise notes
          using AI-powered technology.
        </Text>

      </LinearGradient>

      <View style={styles.card}>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickDocument}
        >

          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color="white"
          />

          <Text style={styles.uploadButtonText}>
            Choose PDF File
          </Text>

        </TouchableOpacity>

        {fileName ? (

          <Text style={styles.fileName}>
            📄 {fileName}
          </Text>

        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Paste your notes here..."
          placeholderTextColor="#94a3b8"
          multiline
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity
          style={styles.summaryButton}
          onPress={handleGenerateSummary}
        >

          <Ionicons
            name="flash-outline"
            size={22}
            color="white"
          />

          <Text style={styles.summaryButtonText}>
            Generate Summary
          </Text>

        </TouchableOpacity>

        {/* CLEAR BUTTON */}

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {

            setNotes("");
            setSummary("");
            setFileName("");

          }}
        >

          <Ionicons
            name="refresh-outline"
            size={22}
            color="#ff4d4d"
          />

          <Text style={styles.clearButtonText}>
            Clear All
          </Text>

        </TouchableOpacity>

        {loading ? (

          <Text style={styles.loadingText}>
            ⚡ Generating AI Summary...
          </Text>

        ) : null}

        {summary ? (

          <View style={styles.summaryBox}>

            <Text style={styles.summaryTitle}>
              AI Summary
            </Text>

            <Text style={styles.summaryText}>
              {summary}
            </Text>

          </View>

        ) : null}

      </View>

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
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginTop: 60,
  },

  subheading: {
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 30,
  },

  heroCard: {
    padding: 25,
    borderRadius: 24,
    marginBottom: 30,
  },

  heroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 15,
  },

  heroText: {
    color: "#e2e8f0",
    lineHeight: 24,
    marginTop: 10,
    fontSize: 15,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 24,
    marginBottom: 50,
  },

  uploadButton: {
    backgroundColor: "#4c7dff",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  uploadButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  fileName: {
    color: "#cbd5e1",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 15,
  },

  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 18,
    padding: 18,
    minHeight: 160,
    color: "white",
    textAlignVertical: "top",
    marginTop: 15,
    fontSize: 16,
  },

  summaryButton: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },

  summaryButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  clearButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },

  clearButtonText: {
    color: "#ff4d4d",
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingText: {
    color: "#94a3b8",
    marginTop: 18,
    textAlign: "center",
    fontSize: 15,
  },

  summaryBox: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 18,
    marginTop: 25,
  },

  summaryTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },

  summaryText: {
    color: "#cbd5e1",
    lineHeight: 26,
    fontSize: 15,
  },

});