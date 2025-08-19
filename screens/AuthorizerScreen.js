import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { supabase } from "../supabase";

export default function AuthorizerScreen({ navigation }) {
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

  // Update status in Supabase
  const updateRequest = async (updatedReq) => {
    const { data, error } = await supabase
      .from("requests")
      .update({ status: updatedReq.status })
      .eq("id", updatedReq.id);

    if (!error) {
      setRequests((prev) =>
        prev.map((r) => (r.id === updatedReq.id ? { ...r, status: updatedReq.status } : r))
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authorizer Dashboard</Text>

      <FlatList
        data={requests.filter((r) => r.status === "Pending")}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RequestDetails", {
                  request: item,
                  role: "Authorizer",
                  updateRequest,
                })
              }
            >
              <Text style={styles.reqTitle}>{item.title}</Text>
              <Text style={styles.reqStatus}>Status: {item.status}</Text>
            </TouchableOpacity>

            {/* Approve / Reject Buttons */}
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#4CAF50" }]}
                onPress={() => updateRequest({ ...item, status: "Authorized" })}
              >
                <Text style={styles.actionText}>Approve</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#F44336" }]}
                onPress={() => updateRequest({ ...item, status: "Rejected" })}
              >
                <Text style={styles.actionText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noRequests}>No requests available</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2", marginTop: 60 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20, color: "#333" },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  reqTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  reqStatus: { fontSize: 16, color: "#555", marginTop: 4 },
  noRequests: { textAlign: "center", marginTop: 20, color: "#333" },
  actionButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
  },
  actionText: { color: "white", fontWeight: "600" },
});
