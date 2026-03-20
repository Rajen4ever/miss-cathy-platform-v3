import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import type { Task } from "@misscathy/types";
import { Screen } from "../../components/screen";
import { SectionTitle } from "../../components/section-title";
import { MobileCard } from "../../components/mobile-card";
import { listTasks } from "../../lib/repositories";

export default function TasksTab() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    void listTasks().then(setTasks);
  }, []);

  return (
    <Screen>
      <SectionTitle eyebrow="Tasks" title="Execution stays visible" subtitle="Every task holds status, next step, and dependency." />
      <MobileCard title="Task list" subtitle="Live repository with demo fallback.">
        {tasks.map((task) => (
          <View key={task.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.body}>{task.description}</Text>
              <Text style={styles.next}>Next: {task.nextStep}</Text>
            </View>
            <Text style={styles.priority}>{task.priority}</Text>
          </View>
        ))}
      </MobileCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)"
  },
  title: { color: "#f8fbff", fontWeight: "700", fontSize: 15 },
  body: { color: "#9ba3b6", fontSize: 13, lineHeight: 19, marginTop: 4 },
  next: { color: "#7dd3fc", fontSize: 13, marginTop: 6 },
  priority: { color: "#f8fbff", fontWeight: "800", fontSize: 18 }
});
