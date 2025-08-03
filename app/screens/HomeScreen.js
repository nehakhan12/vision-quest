// app/HomePageScreen.tsx
import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.title}>Vision Screening Games</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0faff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
});
