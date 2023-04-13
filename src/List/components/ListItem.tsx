import Checkbox from 'expo-checkbox';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ItemTime from './ItemTime';
import { EditableItemKeys } from './List';

type Props = {
  id: string;
  text: string;
  focused: boolean;
  time: number;
  appendItemToList: (id?: string) => void;
  editListItem: (obj: EditableItemKeys, id: string) => void;
  removeItem: (id: string) => void;
};

export default function ListItem(props: Props) {
  const {
    id,
    text,
    focused,
    time,
    appendItemToList,
    editListItem,
    removeItem,
  } = props;
  const [state, setState] = React.useState(false);
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
        onValueChange={setState}
      />
      <TextInput
        style={[styles.item, styles.input]}
        onChangeText={handleChangeText}
        onKeyPress={handleOnKeyPress}
        onSubmitEditing={() => appendItemToList(id)}
        autoFocus={focused}
      >
        {text}
      </TextInput>
      <ItemTime id={id} time={time} editListItem={editListItem} />
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
