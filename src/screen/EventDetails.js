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
  let [eventData, setEventData] = useState('');
  //get parameters from previous page
  const {inputEventId} = route.params;
  const {event_date} = route.params;
  const {event_time} = route.params;
  //concat the event date and time to get the event day
  let event_day = event_date.concat(' ', event_time);
  console.log('EventDay = ', event_day);
  //calculate the duration
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
      <View style={styles.container}>
        <View style={{marginLeft: 10, marginRight: 10, marginTop: 10}}>
          <Text style={styles.heading}>
            Days until {eventData.event_title}{' '}
          </Text>

          <Text style={styles.details}>Duration: {timing}</Text>

          <CountDown
            running={true}
            until={timing}
            onFinish={() => alert('finished')}
            size={30}
            digitStyle={{backgroundColor: '#FFF'}}
          />

          <Text style={styles.details}>
            Event Title: {eventData.event_title}
          </Text>
          <Text style={styles.details}>Event Date: {eventData.event_date}</Text>
          <Text style={styles.details}>Event Time: {eventData.event_time}</Text>
          <Text style={styles.details}>
            Event Venue: {eventData.event_venue}
          </Text>
          <Text style={styles.details}>
            Description: {eventData.event_desc}
          </Text>
          <Text style={styles.details}>Diary: {eventData.event_diary}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    textAlign: 'center',
    padding: 20,
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    padding: 5,
    color: '#101010',
    fontSize: 16,
  },
});

export default EventDetails;
