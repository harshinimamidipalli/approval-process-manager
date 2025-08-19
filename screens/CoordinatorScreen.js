import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { supabase } from "../../supabase";

export default function CoordinatorScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase.from("requests").select("*");
      if (!error) setRequests(data);
    };
    fetchRequests();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coordinator Dashboard</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#4D8462" },
  title: { fontSize: 26, color: "white", marginBottom: 20, textAlign: "center" },
  card: { backgroundColor: "white", padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
});
