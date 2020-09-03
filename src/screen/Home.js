import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

const Home = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_event'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            console.log('no item');
            txn.executeSql('DROP TABLE IF EXISTS table_event', []);
            txn.executeSql(
              //'CREATE TABLE IF NOT EXISTS table_event(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_title VARCHAR(20), event_photo blob, event_date VARCHAR(10),event_time VARCHAR(5),event_venue VARCHAR(50),event_desc VARCHAR(255),event_diary VARCHAR(2000))',
              'CREATE TABLE IF NOT EXISTS table_event(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_title VARCHAR(20), event_date VARCHAR(10),event_time VARCHAR(5),event_venue VARCHAR(50),event_desc VARCHAR(255),event_diary VARCHAR(2000))',
              [],
            );
          }
          console.log('with item');
        },
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome !</Text>
      <TouchableOpacity onPress={() => navigation.navigate('FutureEvent')}>
        <Text>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
