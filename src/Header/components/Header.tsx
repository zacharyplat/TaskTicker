import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../Button';

type Props = {
  timer: number;
  setInitialTime: (num: number) => void;
};

export default function Header(props: Props) {
  const { timer, setInitialTime } = props;
  const minutes = Math.floor(timer / 1000 / 60);
  const seconds = Math.floor((timer / 1000) % 60);
  const displaySeconds = (seconds + '').padStart(2, '0');
  // when we have a start time that has some amount of milliseconds it causes
  // the elapsed time to stutter *might not help*
  const zeroedMillisecondsDate = () => {
    return Math.floor(Date.now() / 1000) * 1000;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Ticker</Text>
      <View style={styles.actions}>
        {timer <= 0 && (
          <Fragment>
            <Button
              title="&#x25B6; Start"
              onPress={() => setInitialTime(zeroedMillisecondsDate())}
              buttonStyle={styles.startButton}
            />
            <Button
              title="Reset"
              onPress={() => console.log('what')}
              buttonStyle={styles.resetButton}
            />
          </Fragment>
        )}
        {timer > 0 && (
          <Fragment>
            <Button
              title="&#x23F9;&#xFE0E; Stop"
              onPress={() => setInitialTime(0)}
              buttonStyle={styles.stopButton}
            />
            <Text style={styles.time}>{`${minutes}:${displaySeconds}`}</Text>
          </Fragment>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  actions: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4f4f4f',
  },
  time: {
    paddingLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4f4f4f',
  },
  startButton: {
    backgroundColor: '#51C308',
  },
  resetButton: {
    backgroundColor: '#4f4f4f',
  },
  stopButton: {
    backgroundColor: '#C31D08',
  },
});
