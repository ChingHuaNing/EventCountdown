
import {StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

import React, { useEffect } from 'react';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'event_db.db', createFromLocation : 1});

function Home(props) {
  const {navigation} = props;

  //shuen database
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_event'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_event(event_id INTEGER PRIMARY KEY AUTOINCREMENT, event_title VARCHAR(20), event_photo blob, event_date VARCHAR(10),event_time VARCHAR(5),event_venue VARCHAR(50),event_desc VARCHAR(255),event_diary VARCHAR(2000))',
              []
            );
          }
        }
      );
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Tab</Text>
      <TouchableOpacity // add button to see event details (temporary)
        onPress={() => navigation.navigate('EventDetails')}>
        <Text>EventDetails</Text>
      </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
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

export default Home;
