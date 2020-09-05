import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';

import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import firestore from '@react-native-firebase/firestore';

//Connection to access the pre-populated database
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

function FutureEvent(props) {
  const {navigation} = props;

  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_event ORDER BY event_date ASC',
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                console.log(results.rows.item(i));
                temp.push(results.rows.item(i));
              }
              setFlatListItems(temp);
            },
          );
        });
        return unsubscribe;
      },
      [navigation],
    );
  }, []);

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
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#a13fe8',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default FutureEvent;
