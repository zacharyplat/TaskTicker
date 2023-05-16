import Checkbox from 'expo-checkbox';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ItemTime from './ItemTime';
import { EditableItemKeys, ListItem as Item } from './List';

type Props = {
  item: Item;
  isActive: boolean;
  focused: boolean;
  timer: number;
  appendItemToList: (id?: string) => void;
  editListItem: (obj: EditableItemKeys, id: string) => void;
  removeItem: (id: string) => void;
  setNextItemActive: (id?: string) => void;
};

export default function ListItem(props: Props) {
  const {
    isActive,
    focused,
    timer,
    appendItemToList,
    editListItem,
    removeItem,
    setNextItemActive,
  } = props;
  const { id, text, isCompleted, elapsed, duration } = props.item;

  const [state, setState] = React.useState(false);

  const handleCheckboxChange = (bool: boolean) => {
    setState(bool);
    editListItem({ isCompleted: bool }, id);
    bool && setNextItemActive();
    !bool && setNextItemActive(id);
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
      {!!timer && (
        <Checkbox
          style={styles.checkbox}
          value={state}
          onValueChange={handleCheckboxChange}
          color={'#4D99B2'}
        />
      )}
      <TextInput
        style={[styles.item, styles.input, isActive ? {} : styles.inactive]}
        onChangeText={handleChangeText}
        onKeyPress={handleOnKeyPress}
        onSubmitEditing={() => appendItemToList(id)}
        autoFocus={focused}
        editable={!timer}
      >
        {text}
      </TextInput>
      <ItemTime
        item={props.item}
        editListItem={editListItem}
        timer={timer}
        isActive={isActive}
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
    padding: 10,
  },
  item: {
    fontSize: 18,
  },

  input: {
    flexGrow: 4,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  inactive: {
    color: 'lightgrey',
  },
});
