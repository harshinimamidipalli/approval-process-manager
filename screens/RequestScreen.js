import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function RequestsScreen() {
  // Dummy data for now
  const requests = [
    { id: '1', title: '5 Printers', status: 'Pending' },
    { id: '2', title: '10 Chairs', status: 'Approved' },
    { id: '3', title: '2 Laptops', status: 'Rejected' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Requests</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.requestTitle}>{item.title}</Text>
            <Text style={[
              styles.status,
              item.status === "Approved" ? styles.approved :
              item.status === "Rejected" ? styles.rejected : styles.pending
            ]}>
              {item.status}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert("Raise a new request")}
      >
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, 
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  status: {
    marginTop: 5,
    fontSize: 16,
  },
  approved: { color: "green" },
  rejected: { color: "red" },
  pending: { color: "orange" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#4D8462",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Android shadow
  },
});
