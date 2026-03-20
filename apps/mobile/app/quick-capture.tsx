import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Screen } from "../components/screen";
import { SectionTitle } from "../components/section-title";

export default function QuickCaptureScreen() {
  const [value, setValue] = useState("");

  return (
    <Screen>
      <SectionTitle
        eyebrow="Quick capture"
        title="Capture now, structure later"
        subtitle="Fast note capture for tasks, blockers, ideas, or health follow-up."
      />
      <View style={styles.card}>
        <TextInput
          multiline
          value={value}
          onChangeText={setValue}
          placeholder="Type a note, blocker, symptom, or next step..."
          placeholderTextColor="#7b8291"
          style={styles.input}
        />
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("Saved", value ? "Capture stored locally in this scaffold. Wire a live write for production." : "Enter some text first.")}
        >
          <Text style={styles.buttonText}>Save capture</Text>
        </Pressable>
      </View>
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
    minHeight: 220,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.24)",
    color: "#f8fbff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    textAlignVertical: "top"
  },
  button: {
    borderRadius: 18,
    backgroundColor: "#7dd3fc",
    paddingVertical: 14,
    alignItems: "center"
  },
  buttonText: { color: "#06101d", fontWeight: "800" }
});
