import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { supabase } from "../supabase";

export default function RequesterScreen({ navigation }) {
  const [requests, setRequests] = useState([]);

  // Load requests from Supabase
  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setRequests(data);
    };
    fetchRequests();
  }, []);

  // Add request into Supabase
  const addRequest = async (newReq) => {
    const { data, error } = await supabase.from("requests").insert([newReq]);
    if (!error) {
      setRequests((prev) => [...prev, ...data]); // update local list too
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Requester Dashboard</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("RequestDetails", { request: item })
            }
          >
            <Text style={styles.reqTitle}>{item.title}</Text>
            <Text>Status: {item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No requests yet</Text>}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("NewRequest", { role: "Requester", addRequest })
        }
      >
        <Text style={styles.buttonText}>+ Raise New Request</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2", marginTop: 60 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  card: { backgroundColor: "white", padding: 15, marginVertical: 8, borderRadius: 8 },
  reqTitle: { fontSize: 18, fontWeight: "600" },
  button: {
    backgroundColor: "#4D8462",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
