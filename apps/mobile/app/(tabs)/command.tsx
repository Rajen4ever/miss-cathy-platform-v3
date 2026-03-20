import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Screen } from "../../components/screen";
import { SectionTitle } from "../../components/section-title";
import { buildCommandResult } from "@misscathy/core";

export default function CommandTab() {
  const [input, setInput] = useState("Build the next launch checklist for Miss Cathy.");
  const result = buildCommandResult(input);

  return (
    <Screen>
      <SectionTitle eyebrow="Auto Command" title="Route the work" subtitle="Short commands become structured outputs with truthful execution bands." />
      <View style={styles.card}>
        <TextInput
          multiline
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a command..."
          placeholderTextColor="#7b8291"
        />
      </View>

      <View style={styles.badges}>
        <Text style={styles.badge}>{result.mode}</Text>
        <Text style={styles.badge}>{result.executionBand}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.headline}>{result.headline}</Text>
        {result.sections.map((section) => (
          <View key={section.title} style={styles.block}>
            <Text style={styles.blockTitle}>{section.title}</Text>
            <Text style={styles.blockBody}>{section.body}</Text>
          </View>
        ))}
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Result is live as you type</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    gap: 12
  },
  input: {
    minHeight: 140,
    color: "#f8fbff",
    textAlignVertical: "top"
  },
  badges: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    color: "#d8e2f0",
    backgroundColor: "rgba(255,255,255,0.04)"
  },
  headline: { color: "#f8fbff", fontSize: 20, fontWeight: "800" },
  block: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.24)",
    padding: 12
  },
  blockTitle: { color: "#f8fbff", fontWeight: "700" },
  blockBody: { color: "#9ba3b6", lineHeight: 20, marginTop: 6 },
  button: { borderRadius: 18, backgroundColor: "#7dd3fc", paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#06101d", fontWeight: "800" }
});
