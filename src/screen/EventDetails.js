import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

//Connection to access the pre-populated event_db.db
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

const EventDetails = () => {
  //let [duration, setDuration] = useState(0);

  //add this to Home
  //let [inputEventId, setInputEventId] = useState('');
  let [eventData, setEventData] = useState({});
  let [duration, setDuration] = useState(0);

  useEffect(() => {
    var inputEventId = 1;
    console.log(inputEventId);
    setEventData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_event where event_id = ?',
        [inputEventId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            calculateDuration;
            setEventData(results.rows.item(0));
          } else {
            alert('No event found');
          }
        },
      );
    });
  }, []);

  let calculateDuration = () => {
    var date = moment().format('YYYY-MM-DD hh:mm:ss+08:00');

    var expirydate = '2020-09-05 11:21:00';
    var diff = moment.duration(moment(expirydate).diff(moment(date)));
    var hours = parseInt(diff.asHours());
    var minutes = parseInt(diff.minutes());
    var seconds = parseInt(diff.seconds());

    var time = hours * 60 * 60 + minutes * 60 + seconds;
    console.log('Duration = ', duration);
    setDuration(time);
    console.log('Duration = ', duration);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
            {/* <Image
              resizeMode="contain"
              style={styles.image}
              source={require('../images/malaysia.png')}
            /> */}
            <Text style={styles.centered}> Days until Merdeka </Text>
            <CountDown
              until={duration}
              onFinish={() => alert('finished')}
              size={30}
              digitStyle={{backgroundColor: '#FFF'}}
            />
            <Text>Name: {eventData.event_title}</Text>
            <Text>Date: {eventData.event_date} </Text>
            <Text>Time: {eventData.event_time} </Text>
            <Text>Place : {eventData.event_venue} </Text>
            <Text>Description: {eventData.event_diary} </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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

export default EventDetails;
