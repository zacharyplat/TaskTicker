import Checkbox from 'expo-checkbox';
import * as React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

type Props = {
  id: string;
  text: string;
  addItemToList: (id?: string) => void;
  editListItem: (text: string, id: string) => void;
  removeItem: (text: string) => void;
};

export default function ListItem(props: Props) {
  const { id, text, addItemToList, editListItem, removeItem } = props;
  const [state, setState] = React.useState(false);
  const [currentText, setCurrentText] = React.useState('');
  const handleChangeText = (string: string) => {
    editListItem(string, id);
    setCurrentText(string);
  };
  const handleEndEditing = () => {
    if (!currentText) {
      removeItem(id);
    }
  };
  return (
    <View style={styles.container}>
      <Checkbox value={state} onValueChange={setState} />
      <TextInput
        style={styles.title}
        onChangeText={handleChangeText}
        onEndEditing={handleEndEditing}
      >
        {text}
      </TextInput>
      <Button title="[+]" onPress={() => addItemToList(id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});
