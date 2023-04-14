import Checkbox from 'expo-checkbox';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ItemTime from './ItemTime';
import { EditableItemKeys, ListItem as Item } from './List';

type Props = {
  item: Item;
  focused: boolean;
  timer: number;
  appendItemToList: (id?: string) => void;
  editListItem: (obj: EditableItemKeys, id: string) => void;
  removeItem: (id: string) => void;
};

export default function ListItem(props: Props) {
  const { focused, timer, appendItemToList, editListItem, removeItem } = props;
  const { id, text, completed, started, duration } = props.item;

  const [state, setState] = React.useState(false);

  const handleCheckboxChange = (bool: boolean) => {
    setState(bool);
    editListItem({ completed: timer }, id);
  };

  const handleChangeText = (string: string) => {
    editListItem({ text: string }, id);
  };
  const handleOnKeyPress = (event: { nativeEvent: { key: string } }) => {
    if (!text && event.nativeEvent.key === 'Backspace') {
      removeItem(id);
    }
  };
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={state}
        onValueChange={handleCheckboxChange}
      />
      <TextInput
        style={[styles.item, styles.input]}
        onChangeText={handleChangeText}
        onKeyPress={handleOnKeyPress}
        onSubmitEditing={() => appendItemToList(id)}
        autoFocus={focused}
        editable={!timer}
      >
        {text}
      </TextInput>
      <ItemTime
        id={id}
        duration={duration}
        editListItem={editListItem}
        timer={timer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 18,
  },
  item: {
    fontSize: 18,
  },
  input: {
    flexGrow: 4,
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 2,
  },
});
