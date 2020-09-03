import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  Image,
  Switch,
  Platform,
  Button,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import {openDatabase} from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

//Connction to access the pre-populated event_db.db
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

// useEffect( ()=> {

// const {}

//  // console.log(inputUserId);

//   db.transaction((tx) => {
//     tx.executeSql(
//       'SELECT * FROM table_user where user_id = ?',
//       [inputUserId],
//       (tx, results) => {
//         var len = results.rows.length;
//         if (len > 0) {
//           let res = results.rows.item(0);
//           updateAllStates(res.user_name, res.user_contact, res.user_address);
//         } else {
//           alert('No user found');
//           updateAllStates('', '', '');
//         }
//       }
//     );
//   });

// });

const EditEvent = ({navigation}) => {
  let [eventData, setEventData] = useState({});

  useEffect(() => {
    var inputEventId = 1;
    console.log(inputEventId);
   // setEventData({});
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

    console.log(eventData);
  }, []);

  let [eventTitle, setEventTitle] = useState(eventData.event_title);
  //let [eventPhoto, setEventPhoto] = useState(eventData.event_photo);
  let [eventDate, setEventDate] = useState(eventData.event_date);
  let [eventTime, setEventTime] = useState(eventData.event_time);
  let [eventVenue, setEventVenue] = useState(eventData.event_venue);
  let [eventDesc, setEventDesc] = useState(eventData.event_desc);
  let [eventDiary, setEventDiary] = useState(eventData.event_diary);
  let [isEnabled, setIsEnabled] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
    console.log('show date picker');
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm1 = (date) => {
    console.warn('A date has been picked: ', date);
    console.log('Date choose', date);
    hideDatePicker();

    eventDate = moment(date).format('YYYY-MM-DD');
    eventDate.toString();
    console.log(eventDate);

    setEventDate(eventDate);

    console.log(eventDate);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
    console.log('show time picker');
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm2 = (time) => {
    console.warn('A time has been picked: ', time);
    console.log('Time chooseL', time);
    hideTimePicker();

    eventTime = moment(time).format('HHmm');

    eventTime.toString();
    setEventTime(eventTime);

    console.log(eventTime);
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  let edit_event = () => {
    console.log(
      eventTitle,
     // eventPhoto,
      eventDate,
      eventTime,
      eventVenue,
      eventDesc,
      eventDiary,
    );

    if (!eventTitle) {
      Alert.alert('Please fill event title');
      return;
    }
    // if (!eventDate) {
    //   alert('Please fill event date');
    //   return;
    // }
    // if (!eventTime) {
    //   alert('Please fill event time');
    //   return;
    // }
    if (!eventVenue) {
      Alert.alert('Please fill event venue');
      return;
    }
    if (!eventDesc) {
      Alert.alert('Please fill event description');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
       // 'INSERT INTO table_event (event_title, event_photo,event_date,event_time,event_venue,event_desc,event_diary) VALUES (?,?,?,?,?,?,?)',
        'INSERT INTO table_event (event_title,event_date,event_time,event_venue,event_desc,event_diary) VALUES (?,?,?,?,?,?)',
        [
          eventTitle,
       //   eventPhoto,
          eventDate,
          eventTime,
          eventVenue,
          eventDesc,
          eventDiary,
        ],

        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event Added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Event added failed');
          }
        },
      );
    });
  };

  // const options = {
  //   title: 'Select Image',
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };

  // let choosePhoto = () => {
  //   ImagePicker.showImagePicker(options, (res) => {
  //     console.log('Response = ', res);

  //     if (res.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (res.error) {
  //       console.log('ImagePicker Error: ', res.error);
  //     } else if (res.customButton) {
  //       console.log('User tapped custom button: ', res.customButton);
  //     } else {
  //       let source = {uri: res.uri};
  //       setEventPhoto(source);
  //     }
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              {/* <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={eventPhoto} style={{width: 120, height: 100}} />
                <Mybutton title="Choose Photo" customClick={choosePhoto} />
              </View> */}

              <Mytextinput
                label="Title"
                placeholder={eventTitle}
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

              {/* <Mytextinput
               label = "Date"
                placeholder="Enter Event Date"
                 onChangeText={(eventDate) => setEventDate(eventDate)}
                 maxLength={10}
                 keyboardType="numeric"
                 style={{ padding: 10 }}
               />

               <Mytextinput
                 label = "Time"
                 placeholder="Enter Event Time"
                 onChangeText={(eventTime) => setEventTime(eventTime)}
                 maxLength={225}
                 numberOfLines={5}
                 multiline={true}
                 style={{ textAlignVertical: 'top', padding: 10 }}
               style={{ padding: 10 }}
               /> */}

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
                  //  ios_backgroundColor="#3e3e3e"
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

              <Mybutton title="Submit" customClick={edit_event} />
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

  datePicker: {
    paddingLeft: 40,
  },

  button: {
    backgroundColor: '#f5cf36',
    color: '#ffffff',
  },
});
