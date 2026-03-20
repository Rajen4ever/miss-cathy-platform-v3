import { Text, View, StyleSheet } from "react-native";
import { demoHealth } from "@misscathy/core";
import { Screen } from "../../components/screen";
import { SectionTitle } from "../../components/section-title";
import { MobileCard } from "../../components/mobile-card";

export default function HealthTab() {
  const followUp = demoHealth[0];

  return (
    <Screen>
      <SectionTitle eyebrow="Health" title="Follow-through with safety" subtitle="Educational support, reminders, and visit prep without overclaiming." />
      <MobileCard title={followUp.title} subtitle={`Urgency level ${followUp.urgencyLevel}`}>
        <Text style={styles.body}>Likely domain: {followUp.likelyDomain}</Text>
        <Text style={styles.body}>Care setting: {followUp.careSetting}</Text>
        <View style={styles.block}>
          <Text style={styles.label}>Questions to prepare</Text>
          {followUp.questionsToPrepare.map((item) => (
            <Text key={item} style={styles.body}>• {item}</Text>
          ))}
        </View>
        <View style={styles.warning}>
          <Text style={styles.warningText}>{followUp.safetyNote}</Text>
        </View>
      </MobileCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.24)",
    padding: 12,
    gap: 6
  },
  label: { color: "#f8fbff", fontWeight: "700" },
  body: { color: "#9ba3b6", lineHeight: 20 },
  warning: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.25)",
    backgroundColor: "rgba(251,191,36,0.10)",
    padding: 12
  },
  warningText: { color: "#fde68a", lineHeight: 20 }
});
