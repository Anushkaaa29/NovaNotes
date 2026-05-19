import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";

import { useState } from "react";

import { generateSummary } from "../../services/gemini";
import { uploadPDF } from "../../services/api";

export default function UploadScreen() {

  const [fileName, setFileName] = useState("");
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const pickDocument = async () => {

    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled) {

      setFileName(result.assets[0].name);

      const formData = new FormData();

      formData.append("pdf", {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        type: "application/pdf",
      } as any);

      try {

        const response = await uploadPDF(formData);

        if (response?.extractedText) {
          setNotes(response.extractedText);
        }

      } catch (error) {
        console.log(error);
      }

    }
  };

  const handleGenerateSummary = async () => {

    if (!notes.trim()) return;

    setLoading(true);

    const result = await generateSummary(notes);

    setSummary(result);

    setLoading(false);
  };

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Upload Your Notes
      </Text>

      <Text style={styles.subheading}>
        Upload PDF or paste notes to generate AI summary
      </Text>

      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Select File
        </Text>

        <Text style={styles.cardText}>
          PDF supported
        </Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={pickDocument}
        >

          <Text style={styles.uploadButtonText}>
            Choose File
          </Text>

        </TouchableOpacity>

        {fileName ? (

          <Text style={styles.fileName}>
            Selected File: {fileName}
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

          <Text style={styles.summaryButtonText}>
            Generate Summary
          </Text>

        </TouchableOpacity>

        {loading ? (

          <Text style={styles.loadingText}>
            Generating Summary...
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

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },

  subheading: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 40,
    lineHeight: 24,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 25,
    borderRadius: 22,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 6,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },

  cardText: {
    fontSize: 15,
    color: "#94a3b8",
    marginBottom: 25,
  },

  uploadButton: {
    backgroundColor: "#4c7dff",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  uploadButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  fileName: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
    color: "#e2e8f0",
    textAlign: "center",
  },

  input: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 14,
    padding: 15,
    minHeight: 140,
    color: "white",
    textAlignVertical: "top",
    marginBottom: 15,
    fontSize: 16,
  },

  summaryButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },

  summaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingText: {
    marginTop: 15,
    textAlign: "center",
    color: "#94a3b8",
  },

  summaryBox: {
    marginTop: 20,
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 16,
  },

  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },

  summaryText: {
    fontSize: 15,
    color: "#cbd5e1",
    lineHeight: 24,
  },

});