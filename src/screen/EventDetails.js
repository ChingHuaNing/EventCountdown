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

const EventDetails = ({route}) => {
  const {inputEventId} = route.params;
  const {event_date} = route.params;
  const {event_time} = route.params;
  let event_day = event_date.concat(
    ' ',
    event_time.substr(0, 2),
    ':',
    event_time.substr(2, 2),
  );
  console.log('EventDay = ', event_day);
  let calculateDuration = () => {
    var date = moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss');
    console.log('Date = ', date);
    var eventDate = moment(event_day).format('YYYY-MM-DD HH:mm');
    console.log('EventDate = ', eventDate);
    var diff = moment.duration(moment(eventDate).diff(moment(date)));

    var hours = parseInt(diff.asHours());
    var minutes = parseInt(diff.minutes());
    var seconds = parseInt(diff.seconds());

    console.log('Hours = ', hours);
    console.log('Minutes = ', minutes);
    console.log('Seconds = ', seconds);
    var duration = hours * 60 * 60 + minutes * 60 + seconds;
    console.log('Duration = ', duration);
    return duration;
  };
  let [eventData, setEventData] = useState('');
  let timing = calculateDuration();

  useEffect(() => {
    console.log(inputEventId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_event where event_id = ?',
        [inputEventId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            setEventData(results.rows.item(0));
          } else {
            alert('No event found');
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
            <Text>Days until Merdeka </Text>
            <Text>First Duration: {duration}</Text>
            <Text>Duration: {timing}</Text>

            <CountDown
              running={true}
              until={timing}
              onFinish={() => alert('finished')}
              size={30}
              digitStyle={{backgroundColor: '#FFF'}}
            />

            <Text>Name: {eventData.event_title}</Text>
            <Text>Date: {eventData.event_date} </Text>
            <Text>Time: {eventData.event_time} </Text>
            <Text>Place: {eventData.event_venue} </Text>
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
