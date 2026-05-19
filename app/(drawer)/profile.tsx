import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";

import {
  getAuth,
  signOut,
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

import { router } from "expo-router";

export default function ProfileScreen() {

  const auth = getAuth();

  const user = auth.currentUser;

  const userName =
    user?.email?.split("@")[0];

  const joinedDate =
    user?.metadata?.creationTime;

  const [summaryCount, setSummaryCount] =
    useState(0);

  const [quizCount, setQuizCount] =
    useState(0);

  const [quizHistory, setQuizHistory] =
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

  const fetchQuizCount =
    async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "quizzes")
        );

      setQuizCount(
        querySnapshot.size
      );

    } catch (error) {

      console.log(error);
    }
  };

  const fetchQuizHistory =
    async () => {

    try {

      const q = query(
        collection(db, "quizzes"),
        orderBy("createdAt", "desc"),
        limit(3)
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

      setQuizHistory(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchSummaryCount();

    fetchQuizCount();

    fetchQuizHistory();

  }, []);

  const handleLogout = async () => {

    await signOut(auth);

    router.replace("/login");
  };

  return (

    <ScrollView style={styles.container}>

      <LinearGradient
        colors={["#4c7dff", "#7c4dff"]}
        style={styles.profileCard}
      >

        <View style={styles.avatar}>

          <Text style={styles.avatarText}>
            {userName?.charAt(0).toUpperCase()}
          </Text>

        </View>

        <Text style={styles.userName}>
          {userName}
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

      </LinearGradient>

      {/* STATS */}

      <View style={styles.statsContainer}>

        <View style={styles.statsCard}>

          <Ionicons
            name="document-text-outline"
            size={28}
            color="#4c7dff"
          />

          <Text style={styles.statsNumber}>
            {summaryCount}
          </Text>

          <Text style={styles.statsLabel}>
            Summaries
          </Text>

        </View>

      </View>

      {/* USER INFO */}

      <View style={styles.infoCard}>

        <View style={styles.infoRow}>

          <Ionicons
            name="calendar-outline"
            size={22}
            color="#4c7dff"
          />

          <Text style={styles.infoText}>
            Joined:
            {joinedDate
              ? new Date(
                  joinedDate
                ).toDateString()
              : "N/A"}
          </Text>

        </View>

        <View style={styles.infoRow}>

          <Ionicons
            name="flash-outline"
            size={22}
            color="#7c4dff"
          />

          <Text style={styles.infoText}>
            Total Activity:
            {summaryCount}
          </Text>

        </View>

        <View style={styles.badge}>

          <Text style={styles.badgeText}>
            PREMIUM USER 🚀
          </Text>

        </View>

      </View>

      {/* SETTINGS */}

      <View style={styles.menuCard}>

        <TouchableOpacity style={styles.menuItem}>

          <Ionicons
            name="settings-outline"
            size={24}
            color="white"
          />

          <Text style={styles.menuText}>
            Settings
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>

          <Ionicons
            name="information-circle-outline"
            size={24}
            color="white"
          />

          <Text style={styles.menuText}>
            About App
          </Text>

        </TouchableOpacity>

      </View>

      {/* QUIZ HISTORY */}

      <Text style={styles.sectionTitle}>
        Recent Quiz Attempts
      </Text>

      {quizHistory.map(
        (item: any) => (

        <View
          key={item.id}
          style={styles.quizCard}
        >

          <Text style={styles.quizText}>
            Score:
            {item.score}/
            {item.totalQuestions}
          </Text>

        </View>

      ))}

      {/* LOGOUT */}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <Ionicons
          name="log-out-outline"
          size={24}
          color="white"
        />

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  profileCard: {
    marginTop: 60,
    padding: 30,
    borderRadius: 28,
    alignItems: "center",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  avatarText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },

  userName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },

  email: {
    color: "#e2e8f0",
    marginTop: 8,
    fontSize: 15,
  },

  statsContainer: {
    marginTop: 30,
  },

  statsCard: {
    backgroundColor: "#1e293b",
    width: "100%",
    padding: 22,
    borderRadius: 22,
    alignItems: "center",
  },

  statsNumber: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  statsLabel: {
    color: "#94a3b8",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#1e293b",
    padding: 22,
    borderRadius: 22,
    marginTop: 25,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },

  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  badge: {
    backgroundColor: "#4c7dff",
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  badgeText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },

  menuCard: {
    backgroundColor: "#1e293b",
    borderRadius: 22,
    marginTop: 30,
    padding: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 15,
  },

  menuText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  quizCard: {
    backgroundColor: "#1e293b",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  quizText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "#ff4d4d",
    marginTop: 30,
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 50,
  },

  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

});