import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1020" },
        headerTintColor: "#f8fbff",
        tabBarStyle: { backgroundColor: "#0b1020", borderTopColor: "rgba(255,255,255,0.08)" },
        tabBarActiveTintColor: "#7dd3fc",
        tabBarInactiveTintColor: "#8a93a7"
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="command" options={{ title: "Command" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="content" options={{ title: "Content" }} />
      <Tabs.Screen name="health" options={{ title: "Health" }} />
      <Tabs.Screen name="more" options={{ title: "More" }} />
    </Tabs>
  );
}
