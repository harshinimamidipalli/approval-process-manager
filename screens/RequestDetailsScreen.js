import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function RequestDetailsScreen({ route, navigation }) {
  const { request, role, updateRequest } = route.params;

  const handleAction = (status) => {
    const updatedReq = { ...request, status };
    updateRequest(updatedReq);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>

      <Text style={styles.label}>Title:</Text>
      <Text style={styles.value}>{request.title}</Text>

      <Text style={styles.label}>Details:</Text>
      <Text style={styles.value}>{request.details || "No details provided"}</Text>

      <Text style={styles.label}>Raised By:</Text>
      <Text style={styles.value}>{request.raisedBy}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{request.status}</Text>

      {/* Only Authorizer/Approver can act */}
      {(role === "Authorizer" || role === "Approver") && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={() => handleAction(`${role} Approved`)}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => handleAction(`${role} Rejected`)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 28, fontWeight: "700", color: "#333", marginBottom: 20 },
  label: { fontSize: 18, fontWeight: "600", marginTop: 10, color: "#333" },
  value: { fontSize: 18, marginBottom: 10, color: "#333" },
  actions: { flexDirection: "row", justifyContent: "space-around", marginTop: 30 },
  button: { padding: 15, borderRadius: 8, width: "40%", alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
});
