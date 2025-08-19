import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { supabase } from "../../supabase";

export default function ApproverScreen({ navigation }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setRequests(data);
      }
    };

    fetchRequests();
  }, []);

  const updateRequest = (updatedReq) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === updatedReq.id ? updatedReq : r))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approver Dashboard</Text>

      <FlatList
        data={requests.filter((r) => r.status === "Authorized")} // 👈 only authorized shown
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("RequestDetails", {
                request: item,
                role: "Approver",    // 👈 Important
                updateRequest,       // 👈 pass function
              })
            }
          >
            <Text style={styles.reqTitle}>{item.title}</Text>
            <Text style={styles.reqStatus}>Status: {item.status}</Text>
          </TouchableOpacity>
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
});
