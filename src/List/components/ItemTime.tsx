import * as React from 'react';
import { Fragment } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import { EditableItemKeys } from './List';

type Props = {
  id: string;
  time: number;
  editListItem: (obj: EditableItemKeys, id: string) => void;
};

const SECOND = 1000;
const MINUTE = SECOND * 60;

export default function ItemTime(props: Props) {
  const { id, time, editListItem } = props;
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = (time / SECOND) % 60;

  const handleChangeMinute = (text: string) => {
    const newTime = parseInt(text, 10) || 0;
    handleChangeText(newTime * MINUTE + seconds * SECOND);
  };
  const handleChangeSecond = (text: string) => {
    const newTime = parseInt(text, 10) || 0;
    handleChangeText(newTime * SECOND + minutes * MINUTE);
  };
  const handleChangeText = (time: number) => {
    editListItem({ time: time }, id);
  };
  return (
    <Fragment>
      <TextInput
        style={[styles.item, styles.input, styles.minute]}
        onChangeText={handleChangeMinute}
        keyboardType={'numeric'}
        maxLength={3}
        placeholder={'min'}
      >
        {minutes > 0 ? minutes : ''}
      </TextInput>
      <Text>:</Text>
      <TextInput
        style={[styles.item, styles.input, styles.second]}
        onChangeText={handleChangeSecond}
        keyboardType={'numeric'}
        maxLength={2}
        placeholder={'sec'}
      >
        {seconds > 0 ? seconds : ''}
      </TextInput>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
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
});
