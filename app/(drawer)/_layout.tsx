import { Drawer } from "expo-router/drawer";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import {
  useEffect,
  useState,
} from "react";

import {
  getAuth,
  signOut,
} from "firebase/auth";

import app from "../../firebase/config";

import { router } from "expo-router";

const auth = getAuth(app);

function CustomDrawerContent(props: any) {

  const user = auth.currentUser;

  const [summaryCount, setSummaryCount] =
    useState(0);

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

  useEffect(() => {

    fetchSummaryCount();

  }, []);

  const handleLogout = async () => {

    await signOut(auth);

    router.replace("/login");
  };

  return (

    <View style={styles.container}>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
        }}
      >

        <View style={styles.profileContainer}>

          <View style={styles.avatar}>

            <Text style={styles.avatarText}>
              {user?.email
                ? user.email.charAt(0).toUpperCase()
                : "U"}
            </Text>

          </View>

          <Text style={styles.userName}>
            {user?.email
              ? user.email.split("@")[0]
              : "User"}
          </Text>

          <Text style={styles.summaryCount}>
            {summaryCount} Summaries
          </Text>

        </View>

        <DrawerItemList {...props} />

      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >

        <View style={styles.logoutRow}>

          <Text style={styles.logoutText}>
            Logout
          </Text>

          <Text style={styles.logoutArrow}>
            →
          </Text>

        </View>

      </TouchableOpacity>

    </View>
  );
}

export default function DrawerLayout() {

  return (

    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}

      screenOptions={{

        headerStyle: {
          backgroundColor: "#111827",
        },

        headerTintColor: "white",

        headerTitleStyle: {
          fontWeight: "bold",
        },

        drawerStyle: {
          backgroundColor: "#0f172a",
          width: 280,
        },

        drawerLabelStyle: {
          color: "white",
          fontSize: 16,
          marginLeft: -10,
          fontWeight: "600",
        },

        drawerActiveBackgroundColor: "#1e3a8a",

        drawerActiveTintColor: "white",

        drawerInactiveTintColor: "#cbd5e1",
      }}
    >

      <Drawer.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="upload"
        options={{
          title: "Upload Notes",
        }}
      />

      <Drawer.Screen
        name="quiz"
        options={{
          title: "Quiz",
        }}
      />

      <Drawer.Screen
        name="history"
        options={{
          title: "History",
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

    </Drawer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },

  profileContainer: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    marginBottom: 10,
    alignItems: "center",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#4c7dff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  avatarText: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },

  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },

  summaryCount: {
    color: "#94a3b8",
    marginTop: 8,
    fontSize: 14,
  },

  logoutButton: {
    backgroundColor: "#111827",
    padding: 18,
    margin: 15,
    borderRadius: 16,
  },

  logoutText: {
    color: "#ff4d4d",
    fontSize: 17,
    fontWeight: "bold",
  },

  logoutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  logoutArrow: {
    color: "#ff4d4d",
    fontSize: 22,
    fontWeight: "bold",
  },

});