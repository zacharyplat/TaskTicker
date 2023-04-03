import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Header() {
  const date = new Date();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Ticker</Text>
      <View style={styles.info}>
        <Button title="|> Start" />
        <Text>{date.toLocaleTimeString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
