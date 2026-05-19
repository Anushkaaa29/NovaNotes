import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import * as Clipboard from "expo-clipboard";

import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
  useEffect,
  useState,
} from "react";

export default function HistoryScreen() {

  const [search, setSearch] =
    useState("");

  const [history, setHistory] =
    useState<any>([]);

  const fetchHistory = async () => {

    try {

      const q = query(
        collection(db, "summaries"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot =
        await getDocs(q);

      const data: any = [];

      querySnapshot.forEach((docItem) => {

        data.push({
          id: docItem.id,
          ...docItem.data(),
        });
      });

      setHistory(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleDelete = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "summaries", id)
      );

      fetchHistory();

    } catch (error) {

      console.log(error);
    }
  };

  const handleCopy = async (
    text: string
  ) => {

    await Clipboard.setStringAsync(
      text
    );

    Alert.alert(
      "Copied 🚀",
      "Summary copied successfully"
    );
  };

  useEffect(() => {

    fetchHistory();

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        History
      </Text>

      {/* SEARCH BAR */}

      <View style={styles.searchBox}>

        <Ionicons
          name="search-outline"
          size={22}
          color="#94a3b8"
        />

        <TextInput
          placeholder="Search summaries..."
          placeholderTextColor="#94a3b8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

      </View>

      {/* EMPTY STATE */}

      {history.length === 0 ? (

        <View style={styles.emptyBox}>

          <Ionicons
            name="document-text-outline"
            size={60}
            color="#4c7dff"
          />

          <Text style={styles.emptyTitle}>
            No summaries yet
          </Text>

          <Text style={styles.emptyText}>
            Upload notes to generate
            AI summaries 🚀
          </Text>

        </View>

      ) : (

        <FlatList

          data={history.filter((item: any) =>
            item.summary
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
          )}

          keyExtractor={(item: any) =>
            item.id
          }

          showsVerticalScrollIndicator={false}

          renderItem={({ item }: any) => (

            <View style={styles.card}>

              <Text
                style={styles.notes}
                numberOfLines={2}
              >
                {item.notes}
              </Text>

              <Text
                style={styles.summary}
                numberOfLines={4}
              >
                {item.summary}
              </Text>

              <View style={styles.actionRow}>

                <TouchableOpacity
                  onPress={() =>
                    handleCopy(item.summary)
                  }
                >

                  <Ionicons
                    name="copy-outline"
                    size={24}
                    color="#4c7dff"
                  />

                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    handleDelete(item.id)
                  }
                >

                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color="#ff4d4d"
                  />

                </TouchableOpacity>

              </View>

            </View>
          )}
        />

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    marginBottom: 20,
  },

  searchBox: {
    backgroundColor: "#1e293b",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 16,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    color: "white",
    padding: 14,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  notes: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },

  summary: {
    color: "#cbd5e1",
    lineHeight: 24,
    fontSize: 15,
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
    marginTop: 15,
  },

  emptyBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },

  emptyTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 24,
  },

});