import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import type { Task } from "@misscathy/types";
import { Screen } from "../../components/screen";
import { MobileCard } from "../../components/mobile-card";
import { SectionTitle } from "../../components/section-title";
import { scheduleLocalReminder, registerExpoPushToken } from "../../lib/notifications";
import { router } from "expo-router";
import { currentUserId, listTasks } from "../../lib/repositories";

export default function HomeTab() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void listTasks().then(setTasks);
  }, []);

  async function onReminder() {
    try {
      await scheduleLocalReminder("Miss Cathy reminder", "Open the dashboard and execute the first next move.", 5);
      Alert.alert("Reminder scheduled", "A local reminder should arrive in a few seconds.");
    } catch (error) {
      Alert.alert("Reminder unavailable", error instanceof Error ? error.message : "Unable to schedule.");
    }
  }

  async function onRegisterToken() {
    try {
      const userId = await currentUserId();
      const token = await registerExpoPushToken(userId);
      Alert.alert(token ? "Push token registered" : "Push token unavailable", token ?? "Set Expo + Supabase env vars and use a real device.");
    } catch (error) {
      Alert.alert("Push setup failed", error instanceof Error ? error.message : "Unable to register token.");
    }
  }

  return (
    <Screen>
      <SectionTitle
        eyebrow="Dashboard"
        title="Operate from the next best move"
        subtitle="Android stays fast: dashboard, command, capture, reminders, and follow-through."
      />

      <MobileCard title="Focus Now" subtitle="Live task repository with demo fallback.">
        {tasks.map((task) => (
          <View key={task.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowTitle}>{task.title}</Text>
              <Text style={styles.rowBody}>{task.nextStep}</Text>
            </View>
            <Text style={styles.priority}>{task.priority}/10</Text>
          </View>
        ))}
      </MobileCard>

      <View style={styles.grid}>
        <Pressable style={styles.action} onPress={onReminder}>
          <Text style={styles.actionTitle}>Schedule reminder</Text>
          <Text style={styles.actionBody}>Local reminder for follow-through</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={onRegisterToken}>
          <Text style={styles.actionTitle}>Register push token</Text>
          <Text style={styles.actionBody}>Save token to Supabase when signed in</Text>
        </Pressable>
        <Pressable style={styles.action} onPress={() => router.push("/quick-capture")}>
          <Text style={styles.actionTitle}>Quick capture</Text>
          <Text style={styles.actionBody}>Save note, blocker, or symptom</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)"
  },
  rowTitle: { color: "#f8fbff", fontSize: 15, fontWeight: "700" },
  rowBody: { color: "#9ba3b6", fontSize: 13, lineHeight: 19, marginTop: 4 },
  priority: { color: "#7dd3fc", fontWeight: "700", fontSize: 13 },
  grid: { gap: 12 },
  action: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    gap: 6
  },
  actionTitle: { color: "#f8fbff", fontWeight: "800", fontSize: 16 },
  actionBody: { color: "#9ba3b6", fontSize: 13, lineHeight: 18 }
});
