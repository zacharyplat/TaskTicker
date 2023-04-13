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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Ticker</Text>
      <View style={styles.info}>
        {timer <= 0 && (
          <Button
            title="&#x25B6; Start"
            onPress={() => setInitialTime(Date.now())}
          />
        )}
        {timer > 0 && (
          <Fragment>
            <Button
              title="&#x23F9;&#xFE0E; Stop"
              onPress={() => setInitialTime(0)}
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  time: {
    paddingLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
