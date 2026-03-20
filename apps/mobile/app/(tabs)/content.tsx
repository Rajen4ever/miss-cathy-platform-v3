import { Text, View, StyleSheet } from "react-native";
import { demoContent } from "@misscathy/core";
import { Screen } from "../../components/screen";
import { SectionTitle } from "../../components/section-title";
import { MobileCard } from "../../components/mobile-card";

export default function ContentTab() {
  const pack = demoContent[0];

  return (
    <Screen>
      <SectionTitle eyebrow="Content" title="Capture and publish" subtitle="Mobile keeps content work lightweight and fast." />
      <MobileCard title={pack.title} subtitle={`${pack.channel} • ${pack.assetType}`}>
        <Text style={styles.body}>{pack.goal}</Text>
        <View style={styles.block}>
          <Text style={styles.label}>Hook</Text>
          <Text style={styles.body}>{pack.hook}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.label}>Repurpose</Text>
          <Text style={styles.body}>{pack.repurposingPlan.join(" • ")}</Text>
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
  body: { color: "#9ba3b6", lineHeight: 20 }
});
