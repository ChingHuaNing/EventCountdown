import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Switch,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import {openDatabase} from 'react-native-sqlite-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

//Connection to access the pre-populated database
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

const EditEvent = ({route, navigation}) => {
  // Accept inputEventId from EventDetails' screen
  const {inputEventId} = route.params;
  let [eventTitle, setEventTitle] = useState('');
  let [eventDate, setEventDate] = useState('');
  let [eventTime, setEventTime] = useState('');
  let [eventVenue, setEventVenue] = useState('');
  let [eventDesc, setEventDesc] = useState('');
  let [eventDiary, setEventDiary] = useState('');
  let [isEnabled, setIsEnabled] = useState(false);

  //load all events' data
  let loadAllData = (
    eventTitle,
    eventDate,
    eventTime,
    eventVenue,
    eventDesc,
    eventDiary,
  ) => {
    setEventTitle(eventTitle);
    setEventDate(eventDate);
    setEventTime(eventTime);
    setEventVenue(eventVenue);
    setEventDesc(eventDesc);
    setEventDiary(eventDiary);
  };

  // Retrive event data according to event_id
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_event where event_id = ?',
        [inputEventId],
        (tx, results) => {
          var len = results.rows.length;

          if (len > 0) {
            let res = results.rows.item(0);
            loadAllData(
              res.event_title,
              res.event_date,
              res.event_time,
              res.event_venue,
              res.event_desc,
              res.event_diary,
            );
          } else {
            alert('No event found');
            loadAllData('', '', '', '', '', '');
          }
        },
      );
    });
  }, []);

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

  // Edit Event Function
  let edit_event = () => {
    //event title is empty
    if (!eventTitle) {
      Alert.alert('Please fill event title');
      return;
    }
    //event date is empty
    if (!eventDate) {
      Alert.alert('Please pick an event date');
      return;
    }
    //event time is empty
    if (!eventTime) {
      Alert.alert('Please pick an event time');
      return;
    }
    //event venue is empty
    if (!eventVenue) {
      Alert.alert('Please fill event venue');
      return;
    }
    //event description is empty
    if (!eventDesc) {
      Alert.alert('Please fill event description');
      return;
    }

    // update event data into database
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_event set event_title=?, event_date=? , event_time=? , event_venue=? , event_desc = ? , event_diary=? where event_id=?',
        [
          eventTitle,
          eventDate,
          eventTime,
          eventVenue,
          eventDesc,
          eventDiary,
          inputEventId,
        ],

        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event edited Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(), // go back to previous page
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Event edit failed');
          }
        },
      );
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
                value={eventTitle}
                placeholder="Enter Event Title"
                onChangeText={(eventTitle) => setEventTitle(eventTitle)}
                style={{padding: 10, fontSize: 20}}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Mybutton
                  title="Pick Your Event Date"
                  customClick={showDatePicker}
                />
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
                }}>
                <Mybutton
                  title="Pick Your Event Time"
                  customClick={showTimePicker}
                />
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
                value={eventVenue}
                onChangeText={(eventVenue) => setEventVenue(eventVenue)}
                maxLength={225}
                style={{padding: 10}}
              />

              <Mytextinput
                label="Description"
                placeholder="Enter Event Description"
                value={eventDesc}
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
                value={eventDiary}
                onChangeText={(eventDiary) => setEventDiary(eventDiary)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />

              <Mybutton title="Edit" customClick={edit_event} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    paddingLeft: 35,
    paddingTop: 25,
    paddingBottom: 10,
  },
  switch: {
    paddingLeft: 250,
    paddingTop: 30,
  },
});
