import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./supabase"; // ✅ our supabase client

// Screens
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RequesterScreen from "./screens/RequesterScreen";
import AuthorizerScreen from "./screens/AuthorizerScreen";
import ApproverScreen from "./screens/ApproverScreen";
import CoordinatorScreen from "./screens/CoordinatorScreen";
import ProprietorScreen from "./screens/ProprietorScreen";
import NewRequestScreen from "./screens/NewRequestScreen";
import RequestDetailsScreen from "./screens/RequestDetailsScreen";
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  // ✅ Test Supabase connection once when app starts
  React.useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        console.log("❌ Supabase Error:", error.message);
      } else {
        console.log("✅ Supabase Connected, Users:", data);
      }
    };
    testConnection();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Requester" component={RequesterScreen} />
        <Stack.Screen name="Authorizer" component={AuthorizerScreen} />
        <Stack.Screen name="Approver" component={ApproverScreen} />
        <Stack.Screen name="Coordinator" component={CoordinatorScreen} />
        <Stack.Screen name="Proprietor" component={ProprietorScreen} />
        <Stack.Screen name="NewRequest" component={NewRequestScreen} />
        <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
