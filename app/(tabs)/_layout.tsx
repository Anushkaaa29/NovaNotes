import { Tabs } from "expo-router";

export default function TabLayout() {

  return (

    <Tabs

      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopWidth: 0,
          height: 70,
        },

        tabBarActiveTintColor: "#4c7dff",
        tabBarInactiveTintColor: "#94a3b8",

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 8,
        },
      }}
    >

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
        }}
      />

      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
        }}
      />

    </Tabs>
  );
}