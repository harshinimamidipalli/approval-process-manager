import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../supabase";

export default function ProprietorScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase.from("requests").select("*");
      if (!error) setRequests(data);
    };
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("requests").update({ status }).eq("id", id);
    setRequests((prev) => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proprietor Dashboard</Text>
      <FlatList
        data={requests.filter(r => r.status === "Approved")} // 👈 only after Approver
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={() => updateStatus(item.id, "Final Approved")}>
                <Text style={styles.buttonText}>Final Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={() => updateStatus(item.id, "Final Rejected")}>
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
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
  row: { flexDirection: "row", marginTop: 10 },
  button: { backgroundColor: "#2E5C41", padding: 8, borderRadius: 6, marginRight: 8 },
  buttonText: { color: "white" },
});
