import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export function MobileCard(props: PropsWithChildren<{ title: string; subtitle?: string }>) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle ? <Text style={styles.subtitle}>{props.subtitle}</Text> : null}
      <View style={styles.body}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 16,
    gap: 8
  },
  title: { color: "#f8fbff", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "#8a93a7", fontSize: 14, lineHeight: 20 },
  body: { gap: 8 }
});
