import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './src/Header/components/Header';
import List from './src/List/components/List';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Header />
        <List />
      </View>
      <StatusBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
