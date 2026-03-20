import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Screen } from "../components/screen";
import { SectionTitle } from "../components/section-title";
import { supabase } from "../lib/supabase";

export default function SignInScreen() {
  const [email, setEmail] = useState("demo@misscathy.local");
  const [password, setPassword] = useState("ChangeMe123!");

  async function onSubmit() {
    if (!supabase) {
      Alert.alert("Demo mode", "Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY to activate live auth.");
      router.replace("/(tabs)");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert("Sign in failed", error.message);
      return;
    }

    router.replace("/(tabs)");
  }

  return (
    <Screen>
      <SectionTitle
        eyebrow="Miss Cathy"
        title="Sign in"
        subtitle="Email/password auth is wired for the mobile companion."
      />
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" />
        <Text style={styles.label}>Password</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
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
    gap: 10
  },
  label: { color: "#cfd7e6", fontSize: 14, fontWeight: "600" },
  input: {
    backgroundColor: "rgba(0,0,0,0.24)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    color: "#f8fbff",
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  button: {
    marginTop: 8,
    borderRadius: 18,
    backgroundColor: "#7dd3fc",
    paddingVertical: 14,
    alignItems: "center"
  },
  buttonText: { color: "#06101d", fontWeight: "800" }
});
