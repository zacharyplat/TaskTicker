import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import ListItem from './ListItem';

type Props = {
  timer: number;
};

export type ListItem = {
  id: string;
  text: string;
  completed?: number;
  started?: number;
  duration: number;
};

export type EditableItemKeys =
  | { text: string }
  | { duration: number }
  | { started: number }
  | { completed: number };

function randId() {
  return Date.now() + '';
}
export default function List(props: Props) {
  const [firstText, setFirstText] = useState('');
  const [list, setList] = useState<ListItem[]>([]);
  const [focusedItem, setFocusedItem] = useState('');
  const { timer } = props;

  /*
  useEffect(() => {
    let active = list.find(
      (item) => item.started !== undefined && !item.completed
    );
    if (!active && !!list[0]) {
      active = list[0];
    }
  }, [timer]);
  */

  const addFirstItem = (text: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: text,
      duration: 0,
    };
    setList([...list, newItem]);
    setFirstText('');
    setFocusedItem(newItem.id);
  };

  const editListItem = (objectToSpread: EditableItemKeys, id: string) => {
    const editedList = list.map((item) =>
      item.id === id ? { ...item, ...objectToSpread } : item
    );
    setList(editedList);
  };

  const appendItemToList = (id?: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: '',
      duration: 0,
    };
    const newList = list.flatMap(
      (item) => (item.id === id && [item, newItem]) || item
    );
    setList(newList);
    setFocusedItem(newItem.id);
  };

  const removeItem = (id: string) => {
    const previousId = getPreviousId(id);
    setFocusedItem(previousId);
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const getPreviousId = (id: string) => {
    const idIndex = list.findIndex((item) => item.id === id);
    return list[idIndex - 1].id;
  };

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <ListItem
            item={item}
            focused={item.id === focusedItem}
            timer={timer}
            appendItemToList={appendItemToList}
            editListItem={editListItem}
            removeItem={removeItem}
          />
        </View>
      ))}
      {timer <= 0 && (
        <View style={styles.listItem}>
          <Button title="[+]" onPress={() => addFirstItem(firstText)} />
          <TextInput
            style={styles.input}
            onChangeText={setFirstText}
            value={firstText}
            placeholder="List item"
            onSubmitEditing={() => addFirstItem(firstText)}
            editable={!timer}
          />
        </View>
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
    paddingTop: 5,
    paddingBottom: 5,
  },
});
