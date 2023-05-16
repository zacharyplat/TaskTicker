import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { EditableItemKeys, ListItem } from './List';

type Props = {
  item: ListItem;
  timer: number;
  isActive: boolean;
  editListItem: (obj: EditableItemKeys, id: string) => void;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;

export default function ItemTime(props: Props) {
  const { id, duration, elapsed, isCompleted } = props.item;
  const { timer, isActive, editListItem } = props;
  const minutes = Math.floor((duration / MINUTE) % 60);
  const seconds = (duration / SECOND) % 60;

  const handleChangeMinute = (text: string) => {
    const newTime = parseInt(text, 10) || 0;
    handleChangeText(newTime * MINUTE + seconds * SECOND);
  };
  const handleChangeSecond = (text: string) => {
    const newTime = parseInt(text, 10) || 0;
    handleChangeText(newTime * SECOND + minutes * MINUTE);
  };
  const handleChangeText = (duration: number) => {
    editListItem({ duration: duration }, id);
  };
  const padTime = (num: number) => {
    const rounding = num > 0 ? Math.floor : Math.ceil;
    return (rounding(num) + '').padStart(2, '0');
  };
  const calcTimeDifference = () => {
    return minutes * MINUTE + seconds * SECOND - (elapsed || 0);
  };

  const renderTimeInputs = () => {
    return (
      <Fragment>
        <TextInput
          style={[styles.itemTime, styles.input, styles.minute]}
          onChangeText={handleChangeMinute}
          keyboardType={'numeric'}
          maxLength={3}
          placeholder={'min'}
        >
          {minutes > 0 ? minutes : ''}
        </TextInput>
        <Text>:</Text>
        <TextInput
          style={[styles.itemTime, styles.input, styles.second]}
          onChangeText={handleChangeSecond}
          keyboardType={'numeric'}
          maxLength={2}
          placeholder={'sec'}
        >
          {seconds > 0 ? seconds : ''}
        </TextInput>
      </Fragment>
    );
  };
  const renderTimeLeft = () => {
    const timeDiff = calcTimeDifference();

    const displayDiff = Math.abs(timeDiff);
    const symbole = timeDiff > 0 ? '+' : '-';
    const color = timeDiff > 0 ? styles.underTime : styles.overTime;
    return (
      <Text style={[color, styles.itemTime, styles.countdown]}>
        {`${symbole}${padTime(displayDiff / MINUTE)}`}:
        {`${padTime((displayDiff / SECOND) % 60)}`}
      </Text>
    );
  };
  const renderCountdownOrTimeLeft = () => {
    if (!isActive && !elapsed) {
      return (
        <Text style={[styles.itemTime, styles.inactive]}>{`${padTime(
          minutes
        )}:${padTime(seconds)}`}</Text>
      );
    } else {
      return renderTimeLeft();
    }
  };
  const renderRoot = () => {
    if (!timer) {
      if (!elapsed) {
        return renderTimeInputs();
      } else {
        return renderTimeLeft();
      }
    } else {
      return renderCountdownOrTimeLeft();
    }
  };
  return <Fragment>{renderRoot()}</Fragment>;
}

const styles = StyleSheet.create({
  itemTime: {
    fontSize: 18,
  },
  inactive: {
    color: 'lightgrey',
  },
  input: {
    flexGrow: 1,
    backgroundColor: '#eee',
    padding: 4,
  },
  minute: {
    marginLeft: 8,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  second: {
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },

  countdown: {
    marginLeft: 8,
    borderRadius: 5,
  },
  underTime: {
    color: '#58B946',
  },
  overTime: {
    color: '#B94658',
  },
});
