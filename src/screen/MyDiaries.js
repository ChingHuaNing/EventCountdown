import {StyleSheet, View, Text, FlatList} from 'react-native';

import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';

function FutureEvent() {
  let [flatListItems, setFlatListItems] = useState([]);

  firestore()
    .collection('events')
    .orderBy('event_date', 'asc')
    .get()
    .then((querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        const {event_title, event_diary} = doc.data();
        temp.push({
          key: doc.id,
          event_title,
          event_diary,
        });
      });
      setFlatListItems(temp);
    });

  let listItemView = (item) => {
    return (
      <View>
        <View style={styles.listItem}>
          <Text style={{fontWeight: 'bold'}}>Title: {item.event_title}</Text>
          <Text>Diary: {item.event_diary}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList // display all events
        style={{flex: 1}}
        data={flatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 10,
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '90%',
    height: '50%',
    flex: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
});

export default FutureEvent;
