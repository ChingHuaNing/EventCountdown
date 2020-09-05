import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Switch,
  Button,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import {openDatabase} from 'react-native-sqlite-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';

import moment from 'moment';

//Connection to access the pre-populated database
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

const AddEvent = ({navigation}) => {
  let [eventTitle, setEventTitle] = useState('');
  let [eventDate, setEventDate] = useState('');
  let [eventTime, setEventTime] = useState('');
  let [eventVenue, setEventVenue] = useState('');
  let [eventDesc, setEventDesc] = useState('');
  let [eventDiary, setEventDiary] = useState('');
  let [isEnabled, setIsEnabled] = useState(false);

  // date and time picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Show Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hide Date Picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Set Event Date
  const handleConfirm1 = (date) => {
    hideDatePicker();

    eventDate = moment(date).format('YYYY-MM-DD');
    eventDate.toString();

    setEventDate(eventDate);
  };

  // Show Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  // Hide Time Picker
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  // Set Event Time
  const handleConfirm2 = (time) => {
    hideTimePicker();

    eventTime = moment(time).format('HH:mm');

    eventTime.toString();
    setEventTime(eventTime);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //calculate the duration
  let calculateDuration = (event_date, event_time) => {
    let event_day = event_date.concat(' ', event_time);
    var date = moment().utcOffset('+0800').format('YYYY-MM-DD HH:mm:ss');
    var eventDate = moment(event_day).format('YYYY-MM-DD HH:mm');
    var diff = moment.duration(moment(eventDate).diff(moment(date)));

    var hours = parseInt(diff.asHours());
    var minutes = parseInt(diff.minutes());
    var seconds = parseInt(diff.seconds());

    var duration = hours * 60 * 60 + minutes * 60 + seconds;
    return duration;
  };

  // Add Event Function
  let add_event = () => {
    // If event date and time is not chosen
    if (calculateDuration(eventDate, eventTime) < 0) {
      Alert.alert('Please pick future event date and event time');
      return;
    }

    // event title is empty
    if (!eventTitle) {
      Alert.alert('Please fill event title');
      return;
    }
    // event title is empty
    if (!eventDate) {
      Alert.alert('Please pick an event date');
      return;
    }
    // event time is empty
    if (!eventTime) {
      Alert.alert('Please pick an event time');
      return;
    }
    // event venue is empty
    if (!eventVenue) {
      Alert.alert('Please fill event venue');
      return;
    }
    // event description is empty
    if (!eventDesc) {
      Alert.alert('Please fill event description');
      return;
    }

    // Add event data into sqlite database
    db.transaction(function (tx) {
      firestore().collection('events').doc().set({
        event_title: eventTitle,
        event_date: eventDate,
        event_time: eventTime,
        event_diary: eventDiary,
      });

      tx.executeSql(
        'INSERT INTO table_event (event_title,event_date,event_time,event_venue,event_desc,event_diary) VALUES (?,?,?,?,?,?)',
        [eventTitle, eventDate, eventTime, eventVenue, eventDesc, eventDiary],

        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event Added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('FutureEvent'), // go back to future event's page
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Event added failed'); // Event is not added successfully
          }
        },
      );
    });

    // add event title, date, time and diary into cloud firestore
    firestore().collection('events').add({
      event_title: eventTitle,
      event_date: eventDate,
      event_time: eventTime,
      event_diary: eventDiary,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                label="Title"
                placeholder="Enter Event Title"
                onChangeText={(eventTitle) => setEventTitle(eventTitle)}
                style={{padding: 10}}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingLeft: 40,
                  padding: 10,
                }}>
                <Button title="Pick Your Event Date" onPress={showDatePicker} />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm1}
                  onCancel={hideDatePicker}
                  displayFormat="DD/MM/YYYY"
                />

                <Text style={styles.titleText}>{eventDate}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingLeft: 40,
                  padding: 10,
                }}>
                <Button title="Pick Your Event Time" onPress={showTimePicker} />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm2}
                  onCancel={hideTimePicker}
                  is24Hour={true}
                />

                <Text style={styles.titleText}>{eventTime}</Text>
              </View>

              <Mytextinput
                label="Venue"
                placeholder="Enter Event Venue"
                onChangeText={(eventVenue) => setEventVenue(eventVenue)}
                maxLength={225}
                style={{padding: 10}}
              />

              <Mytextinput
                label="Description"
                placeholder="Enter Event Description"
                onChangeText={(eventDesc) => setEventDesc(eventDesc)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />

              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.titleText}>{'Alert'}</Text>
                <Switch
                  style={styles.switch}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <Mytextinput
                label="Diary"
                placeholder="Enter Event Diary"
                onChangeText={(eventDiary) => setEventDiary(eventDiary)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />

              <Mybutton title="Submit" customClick={add_event} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
  switch: {
    paddingLeft: 250,
  },
});
