import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RoleBasedScreen({ route }) {
  const { role } = route.params;  // 👈 role passed from Login

  return (
    <View style={styles.container}>
      {role === "Requester" && <Text style={styles.text}>Requester Dashboard</Text>}
      {role === "Authorizer" && <Text style={styles.text}>Authorizer Dashboard</Text>}
      {role === "Approver" && <Text style={styles.text}>Approver Dashboard</Text>}
      {role === "Coordinator" && <Text style={styles.text}>Coordinator Dashboard</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
});
