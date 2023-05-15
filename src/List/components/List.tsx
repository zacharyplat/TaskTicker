import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import ListItem from './ListItem';

type Props = {
  timer: number;
};

export type ListItem = {
  id: string;
  text: string;
  isCompleted?: boolean;
  elapsed?: number;
  duration: number;
};

export type EditableItemKeys =
  | { text: string }
  | { duration: number }
  | { elapsed: number }
  | { isCompleted: boolean };

function randId() {
  return Date.now() + '';
}
export default function List(props: Props) {
  const [firstText, setFirstText] = useState('');
  const [list, setList] = useState<ListItem[]>([]);
  const [focusedItemId, setFocusedItemId] = useState('');
  const [activeItemId, setActiveItemId] = useState('');
  const [timerSinceLastElapsed, setTimerSinceLastElapsed] = useState(0);
  const { timer } = props;

  useEffect(() => {
    if (timer <= 0 || !!activeItemId) {
      incrementElapsedTime();
      return;
    }
    !!list[0] && setActiveItemId(list[0].id);
  }, [timer]);

  const addEndItem = (text: string) => {
    const newItem: ListItem = {
      id: randId(),
      text: text,
      duration: 0,
    };
    setList([...list, newItem]);
    setFirstText('');
    setFocusedItemId(newItem.id);
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
    setFocusedItemId(newItem.id);
  };

  const removeItem = (id: string) => {
    const previousId = getPreviousId(id);
    setFocusedItemId(previousId);
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const getPreviousId = (id: string) => {
    const idIndex = list.findIndex((item) => item.id === id);
    return list[idIndex - 1].id;
  };

  const setNextItemActive = (id?: string) => {
    if (id) {
      setActiveItemId(id);
      return;
    }
    const activeIndex = list.findIndex((item) => item.id === activeItemId);
    const nextItem = list[activeIndex + 1];
    nextItem && setActiveItemId(nextItem.id);
  };
  const incrementElapsedTime = () => {
    const elapsed = timer - timerSinceLastElapsed;
    const item = list.find((item) => item.id === activeItemId);
    editListItem({ elapsed: elapsed + (item?.elapsed || 0) }, activeItemId);
    setTimerSinceLastElapsed(timer);
  };

  return (
    <View style={styles.container}>
      {list.map((item) => (
        <View style={styles.listItem} key={item.id}>
          <ListItem
            item={item}
            isActive={item.id === activeItemId}
            focused={item.id === focusedItemId}
            timer={timer}
            appendItemToList={appendItemToList}
            editListItem={editListItem}
            removeItem={removeItem}
            setNextItemActive={setNextItemActive}
          />
        </View>
      ))}
      {timer <= 0 && (
        <View style={styles.listItem}>
          <Button title="[+]" onPress={() => addEndItem(firstText)} />
          <TextInput
            style={styles.input}
            onChangeText={setFirstText}
            value={firstText}
            placeholder="List item"
            onSubmitEditing={() => addEndItem(firstText)}
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
