import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../supabase";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // 1️⃣ Login using Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    // 2️⃣ Fetch role from users table
    const { data: userRow, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("email", email)
      .single();

    if (roleError) {
      Alert.alert("Error", roleError.message);
      return;
    }

    // 3️⃣ Navigate to the correct dashboard based on role
    if (userRow && userRow.role) {
      navigation.replace(userRow.role);
    } else {
      Alert.alert("Error", "No role assigned to this user");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace("SignUp")}>
        <Text style={{ color: "#fff", marginTop: 15 }}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4D8462",
    padding: 20,
  },
  title: { fontSize: 28, color: "white", marginBottom: 20 },
  input: {
    width: "80%",
    backgroundColor: "white",
    padding: 12,
    marginVertical: 8,
    borderRadius: 6,
  },
  button: {
    backgroundColor: "#2E5C41",
    padding: 12,
    marginTop: 20,
    borderRadius: 6,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
