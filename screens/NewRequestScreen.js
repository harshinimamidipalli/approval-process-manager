import { supabase } from "../../supabase";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function NewRequestScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    const { error } = await supabase.from("requests").insert([
      {
        title,
        description,
        status: "Pending",
        created_by: user.email,
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", "Request created!");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raise a New Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#4D8462" },
  title: { fontSize: 26, color: "white", marginBottom: 20, textAlign: "center" },
  input: { backgroundColor: "white", padding: 12, borderRadius: 6, marginVertical: 10 },
  button: { backgroundColor: "#2E5C41", padding: 15, borderRadius: 6, marginTop: 20, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
