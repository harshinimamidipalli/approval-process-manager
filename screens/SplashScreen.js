import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");  // move to login after 2s
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assets/plogo.png")} 
        style={styles.logo}
        resizeMode="contain"   // 👈 keeps image fully visible without cutting
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D8462',  // same background as brand color
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '80%',    // take 80% of screen width
    height: '40%',   // take 40% of screen height
  },
});
