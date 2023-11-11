// Type 'rnfes' for quick-setup
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import React from "react"
// Import external style.js file
import styles from "./styles/home.style"

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  )
}

export default Home
