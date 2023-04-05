import Checkbox from 'expo-checkbox';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
  id: string;
  text: string;
  focused: boolean;
  appendItemToList: (id?: string) => void;
  editListItem: (text: string, id: string) => void;
  removeItem: (id: string) => void;
};

export default function ListItem(props: Props) {
  const { id, text, focused, appendItemToList, editListItem, removeItem } =
    props;
  const [state, setState] = React.useState(false);
  const handleChangeText = (string: string) => {
    editListItem(string, id);
  };
  const handleOnKeyPress = (event: { nativeEvent: { key: string } }) => {
    console.log(event.nativeEvent.key);
    if (!text && event.nativeEvent.key === 'Backspace') {
      removeItem(id);
    }
  };
  console.log(`item ${id} focused: ${focused}`);
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
    flexShrink: 0,
    flexGrow: 1,
    borderBottomColor: 'darkgrey',
    borderBottomWidth: 2,
  },
});
