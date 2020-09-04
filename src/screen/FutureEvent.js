import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import Swipeout from 'react-native-swipeout';

import React, {useEffect, useState} from 'react';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

function FutureEvent(props) {
  const {navigation} = props;

  let [flatListItems, setFlatListItems] = useState([]);
  let [eventId, setEventId] = useState('');

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
        <TouchableOpacity
          item={item}
          onPress={() => {
            navigation.navigate('EventDetails', {
              inputEventId: item.event_id, //event_id
              event_date: item.event_date, //event_date
              event_time: item.event_time, //event_time
            });
          }}>
          <View style={styles.listItem}>
            <Text style={{fontWeight: 'bold'}}>Title: {item.event_title}</Text>
            <Text>Date: {item.event_date}</Text>
          </View>
        </TouchableOpacity>
      </View>

      // <View key={item.event_id} style={styles.listItem}>
      //   <View style={{alignItems: 'center'}}>
      //  {/* <ImageBackground
      //       source={{uri: item.event_photo}}
      //       style={styles.image}> */}
      //       <Text style={{fontWeight: 'bold'}}>title:{item.event_title}</Text>
      //       <Text style={{color: '#000000'}}>{item.event_date}</Text>
      //       <Text>{item.event_time}</Text>
      //       <Text>{item.event_venue}</Text>
      //     {/* </ImageBackground> */}
      //   </View>
      // </View>
    );
  };

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_event where event_id=?',
        [eventId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('FutureEvent'),
                },
              ],
              {cancelable: true},
            );
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1}}
        data={flatListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => listItemView(item)}
      />

      {/* <Text style={styles.text}>Home Tab</Text> */}

      {/* <TouchableOpacity // add button to see event details (temporary)
        onPress={() =>
          navigation.navigate('EventDetails', {
            inputEventId: 1, //event_id
            event_date: '2020-09-05', //event_date
            event_time: '0300', //event_time
          })
        }>
        <Text>EventDetails</Text>
      </TouchableOpacity> */}

      <TouchableOpacity // add button to add new event
        onPress={() => navigation.navigate('AddEvent')}
        style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
    //flexDirection: 'row',
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
