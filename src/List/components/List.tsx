import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import ListItem from './ListItem';

type ListItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};
function randId() {
  return Math.floor(Math.random() * 10 ** 5) + '';
}
export default function List() {
  const [text, onChangeText] = useState('');
  const [list, setList] = useState<ListItem[]>([]);

  const addFirstItem = (text: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: text,
      isCompleted: false,
    };
    setList([newItem]);
  };

  const editListItem = (text: string, id: string) => {
    const editedList = list.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setList(editedList);
  };

  const addItemToList = (id?: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: '',
      isCompleted: false,
    };
    const newList = list.flatMap(
      (item) => (item.id === id && [item, newItem]) || item
    );
    console.log(list);
    id ? setList(newList) : setList([newItem]);
  };

  const removeItem = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <ListItem
          id={item.id}
          key={item.id}
          text={item.text}
          addItemToList={addItemToList}
          editListItem={editListItem}
          removeItem={removeItem}
        />
      ))}
      {!list.length && (
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Add item"
          onSubmitEditing={() => addFirstItem(text)}
        />
      )}
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
