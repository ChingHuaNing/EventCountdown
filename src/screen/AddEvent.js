import React, {useState} from 'react';
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
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

import {openDatabase} from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';

//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

const AddEvent = ({navigation}) => {
  let [eventTitle, setEventTitle] = useState('');
  let [eventPhoto, setEventPhoto] = useState('');
  let [eventDate, setEventDate] = useState('');
  let [eventTime, setEventTime] = useState('');
  let [eventVenue, setEventVenue] = useState('');
  let [eventDesc, setEventDesc] = useState('');
  let [eventDiary, setEventDiary] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  let add_event = () => {
    console.log(
      eventTitle,
      eventPhoto,
      eventDate,
      eventTime,
      eventVenue,
      eventDesc,
      eventDiary,
    );

    if (!eventTitle) {
      alert('Please fill event title');
      return;
    }
    if (!eventDate) {
      alert('Please fill event date');
      return;
    }
    if (!eventTime) {
      alert('Please fill event time');
      return;
    }
    if (!eventVenue) {
      alert('Please fill event venue');
      return;
    }
    if (!eventDesc) {
      alert('Please fill event description');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_event (event_title, event_photo,event_date,event_time,event_venue,event_desc,event_diary) VALUES (?,?,?,?,?,?,?)',
        [
          eventTitle,
          eventPhoto,
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
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Event added failed');
        },
      );
    });
  };

  const options = {
    title: 'Select Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  let choosePhoto = () => {
    ImagePicker.showImagePicker(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        // const source = { uri: res.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + res.data };

        //   this.setState({
        //   photo: source,
        //  });
        let source = {uri: res.uri};
        console.log({source});
        (eventPhoto) => setEventPhoto(eventPhoto);

        // return source;
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('./img/photo.png')}
                  style={{width: 100, height: 100}}
                />
                <Mybutton title="Choose Photo" customClick={choosePhoto} />
              </View>

              <Mytextinput
                label="Title"
                placeholder="Enter Event Title"
                onChangeText={(eventTitle) => setEventTitle(eventTitle)}
                style={{padding: 10}}
              />
              <Mytextinput
                label="Date"
                placeholder="Enter Event Date"
                onChangeText={(eventDate) => setEventDate(eventDate)}
                maxLength={10}
                //  keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                label="Time"
                placeholder="Enter Event Time"
                onChangeText={(eventTime) => setEventTime(eventTime)}
                // maxLength={225}
                //   numberOfLines={5}
                //   multiline={true}
                //  style={{ textAlignVertical: 'top', padding: 10 }}
                style={{padding: 10}}
              />

              <Mytextinput
                label="Venue"
                placeholder="Enter Event Venue"
                onChangeText={(eventVenue) => setEventVenue(eventVenue)}
                maxLength={225}
                //   numberOfLines={5}
                //   multiline={true}
                //  style={{ textAlignVertical: 'top', padding: 10 }}
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
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
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

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    padding: 10,
  },
});

export default AddEvent;
