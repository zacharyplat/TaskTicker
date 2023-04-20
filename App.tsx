import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Header from './src/Header/components/Header';
import List from './src/List/components/List';

export default function App() {
  const [initialTime, setInitialTime] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (initialTime <= 0) {
      setTimer(0);
      return;
    }

    setTimer(1);
    const interval = setInterval(() => {
      const diff = Date.now() - initialTime;
      // checks often to update the timer as soon as the time changes but
      // don't rerender every 50 miliseconds
      // so only set a new timer if a second has elapsed
      setTimer((prevState) => (diff > prevState + 1000 ? diff : prevState));
    }, 50);

    return () => clearInterval(interval);
  }, [initialTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Header
          timer={timer}
          setInitialTime={(time: number) => setInitialTime(time)}
        />
        <List timer={timer} />
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
