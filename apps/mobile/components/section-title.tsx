import { Text, View, StyleSheet } from "react-native";

export function SectionTitle(props: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.eyebrow}>{props.eyebrow}</Text>
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle ? <Text style={styles.subtitle}>{props.subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  eyebrow: { color: "#7dd3fc", textTransform: "uppercase", letterSpacing: 2, fontSize: 11, fontWeight: "600" },
  title: { color: "#f8fbff", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#8a93a7", fontSize: 14, lineHeight: 21 }
});
