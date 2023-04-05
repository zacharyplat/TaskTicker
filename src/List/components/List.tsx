import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import ListItem from './ListItem';

type ListItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};
function randId() {
  return Date.now() + '';
}
export default function List() {
  const [firstText, setFirstText] = useState('');
  const [list, setList] = useState<ListItem[]>([]);
  const [focusedItem, setFocusedItem] = useState('');

  const addFirstItem = (text: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: text,
      isCompleted: false,
    };
    setList([newItem]);
    setFirstText('');
    setFocusedItem(newItem.id);
    console.log('addFirstItem');
  };

  const editListItem = (text: string, id: string) => {
    const editedList = list.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setList(editedList);
    console.log('editListItem');
  };

  const appendItemToList = (id?: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: '',
      isCompleted: false,
    };
    const newList = list.flatMap(
      (item) => (item.id === id && [item, newItem]) || item
    );
    id ? setList(newList) : setList([newItem]);
    setFocusedItem(newItem.id);
    console.log('appendItemToList');
  };

  const removeItem = (id: string) => {
    const previousId = getPreviousId(id);
    console.log(`old focusid ${focusedItem}`);
    console.log(`new focusid ${previousId}`);
    setFocusedItem(previousId);
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    console.log('removeItem');
  };
  const getPreviousId = (id: string) => {
    console.log('getpreviousId');
    const idIndex = list.findIndex((item) => item.id === id);
    return list[idIndex - 1].id;
  };

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <ListItem
            id={item.id}
            key={item.id}
            text={item.text}
            focused={item.id === focusedItem}
            appendItemToList={appendItemToList}
            editListItem={editListItem}
            removeItem={removeItem}
          />
        </View>
      ))}
      <View style={styles.listItem}>
        <Button title="[+]" onPress={() => addFirstItem(firstText)} />
        <TextInput
          style={styles.input}
          onChangeText={setFirstText}
          value={firstText}
          placeholder="List item"
          onSubmitEditing={() => addFirstItem(firstText)}
        />
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flexShrink: 0,
    flexGrow: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
  },
});
