import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { supabase } from "../supabase";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Requester"); // default role

  const handleSignUp = async () => {
    // 1️⃣ Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    // 2️⃣ Insert into users table with role
    const { error: dbError } = await supabase.from("users").insert([
      { email, role },
    ]);

    if (dbError) {
      Alert.alert("Error", dbError.message);
      return;
    }

    Alert.alert("Success", "Account created! Please log in.");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      {/* Simple role selection for now */}
      <Text style={styles.label}>Select Role:</Text>
      <TouchableOpacity onPress={() => setRole("Requester")}>
        <Text style={[styles.role, role === "Requester" && styles.selected]}>Requester</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("Authorizer")}>
        <Text style={[styles.role, role === "Authorizer" && styles.selected]}>Authorizer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("Approver")}>
        <Text style={[styles.role, role === "Approver" && styles.selected]}>Approver</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("Coordinator")}>
        <Text style={[styles.role, role === "Coordinator" && styles.selected]}>Coordinator</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setRole("Proprietor")}>
        <Text style={[styles.role, role === "Proprietor" && styles.selected]}>Proprietor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("Login")}>
        <Text style={styles.switch}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 8 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  role: { fontSize: 18, marginVertical: 4, color: "#555" },
  selected: { color: "#4D8462", fontWeight: "700" },
  button: { backgroundColor: "#4D8462", padding: 15, marginTop: 20, borderRadius: 8, width: "100%", alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
  switch: { marginTop: 20, color: "#4D8462", fontSize: 16 },
});
