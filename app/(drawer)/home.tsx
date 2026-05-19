import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
} from "@expo/vector-icons";

import { router } from "expo-router";

import {
  getAuth,
} from "firebase/auth";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
  useEffect,
  useState,
} from "react";

export default function HomeScreen() {

  const auth = getAuth();

  const user = auth.currentUser;

  const userName =
    user?.email?.split("@")[0];

  const [summaryCount, setSummaryCount] =
    useState(0);

  const [recentSummaries, setRecentSummaries] =
    useState<any>([]);

  const fetchSummaryCount = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "summaries")
        );

      setSummaryCount(
        querySnapshot.size
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchRecentSummaries =
    async () => {

    try {

      const q = query(
        collection(db, "summaries"),
        orderBy("createdAt", "desc"),
        limit(2)
      );

      const querySnapshot =
        await getDocs(q);

      const data: any = [];

      querySnapshot.forEach(
        (docItem) => {

        data.push({
          id: docItem.id,
          ...docItem.data(),
        });

      });

      setRecentSummaries(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchSummaryCount();

    fetchRecentSummaries();

  }, []);

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.welcome}>
        👋 Welcome,
      </Text>

      <Text style={styles.userName}>
        {userName}
      </Text>

      {/* HERO CARD */}

      <LinearGradient
        colors={["#4c7dff", "#7c4dff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroCard}
      >

        <Text style={styles.heroTitle}>
          AI Notes Assistant 🚀
        </Text>

        <Text style={styles.heroText}>
          Generate summaries and
          manage your smart notes.
        </Text>

      </LinearGradient>

      {/* QUICK ACTIONS */}

      <Text style={styles.sectionTitle}>
        Quick Actions
      </Text>

      <View style={styles.actionsContainer}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/(drawer)/upload")
          }
        >

          <Ionicons
            name="cloud-upload-outline"
            size={34}
            color="#4c7dff"
          />

          <Text style={styles.actionText}>
            Upload Notes
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            router.push("/(drawer)/quiz")
          }
        >

          <Ionicons
            name="help-circle-outline"
            size={34}
            color="#7c4dff"
          />

          <Text style={styles.actionText}>
            Start Quiz
          </Text>

        </TouchableOpacity>

      </View>

      {/* STATS */}

      <Text style={styles.sectionTitle}>
        Stats
      </Text>

      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Text style={styles.statsNumber}>
            {summaryCount}
          </Text>

          <Text style={styles.statsLabel}>
            Summaries
          </Text>

        </View>

      </View>

      {/* RECENT SUMMARIES */}

      <Text style={styles.sectionTitle}>
        Recent Summaries
      </Text>

      {recentSummaries.map(
        (item: any) => (

        <View
          key={item.id}
          style={styles.recentCard}
        >

          <Text
            style={styles.recentText}
            numberOfLines={3}
          >
            {item.summary}
          </Text>

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  welcome: {
    color: "#94a3b8",
    fontSize: 18,
    marginTop: 60,
  },

  userName: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 25,
  },

  heroCard: {
    padding: 25,
    borderRadius: 24,
    marginBottom: 30,
  },

  heroTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  heroText: {
    color: "#e2e8f0",
    lineHeight: 24,
    fontSize: 16,
  },

  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  actionCard: {
    backgroundColor: "#1e293b",
    width: "48%",
    padding: 22,
    borderRadius: 22,
    alignItems: "center",
  },

  actionText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },

  statsContainer: {
    marginBottom: 30,
  },

  statsCard: {
    backgroundColor: "#1e293b",
    width: "100%",
    padding: 24,
    borderRadius: 22,
    alignItems: "center",
  },

  statsNumber: {
    color: "#4c7dff",
    fontSize: 34,
    fontWeight: "bold",
  },

  statsLabel: {
    color: "#cbd5e1",
    marginTop: 8,
    fontSize: 16,
  },

  recentCard: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 22,
    marginBottom: 18,
  },

  recentText: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
  },

});