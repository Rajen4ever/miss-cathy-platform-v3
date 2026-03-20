import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import type { ConnectorRegistryItem } from "@misscathy/types";
import { Screen } from "../../components/screen";
import { SectionTitle } from "../../components/section-title";
import { MobileCard } from "../../components/mobile-card";
import { listConnectors } from "../../lib/repositories";

export default function MoreTab() {
  const [connectors, setConnectors] = useState<ConnectorRegistryItem[]>([]);

  useEffect(() => {
    void listConnectors().then(setConnectors);
  }, []);

  return (
    <Screen>
      <SectionTitle eyebrow="More" title="Connectors, profile, and settings" subtitle="Keep boundaries visible and setup pathways obvious." />

      <MobileCard title="Connector registry" subtitle="Live repository with demo fallback.">
        {connectors.map((connector) => (
          <View key={connector.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{connector.connectorName}</Text>
              <Text style={styles.body}>{connector.status} • {connector.truthfulBand}</Text>
            </View>
          </View>
        ))}
      </MobileCard>

      <Pressable style={styles.button} onPress={() => router.push("/sign-in")}>
        <Text style={styles.buttonText}>Open sign in</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)"
  },
  title: { color: "#f8fbff", fontWeight: "700", fontSize: 15 },
  body: { color: "#9ba3b6", fontSize: 13, lineHeight: 19, marginTop: 4 },
  button: { borderRadius: 18, backgroundColor: "#7dd3fc", paddingVertical: 14, alignItems: "center" },
  buttonText: { color: "#06101d", fontWeight: "800" }
});
