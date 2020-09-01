import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

export default function CalendarScreen({navigation}) {
  let [selectedDate, setSelectedDate] = useState('');
  let [markedDate, setMarkedDate] = useState({});
  let [eventItemList, setEventItemList] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM event', [], (tx, result) => {
        if (result.rows.length > 0) {
          var tempEventList = [];
          for (i = 0; i < result.rows.length; i++) {
            tempEventList.push(result.rows.item(i));
            setEventItemList(tempEventList);
            console.log(eventItemList);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    const markedDateOnCalendar = () => {
      let markedDates = {};
      let eventDates = eventItemList.map((item) => item.event_date);
      console.log(eventDates);

      for (i = 0; i < eventDates.length; i++) {
        markedDates[eventDates[i]] = {
          selected: true,
          marked: true,
          selectedColor: '#ffff80',
        };
        console.log(markedDates);
      }

      setMarkedDate(markedDates);
    };
    markedDateOnCalendar();
  }, [eventItemList]);

  // let listEventItem = (item) => {
  //   return (
  //     <View>
  //       <Text>{item.event_name}</Text>
  //     </View>
  //   );
  // };

  // select date
  let getOnPressEvent = (day) => {
    let selectedDate = moment(day.dateString);
    selectedDate = selectedDate.format('YYYY-MM-DD');
    setSelectedDate(selectedDate);
    console.log(selectedDate);

    let eventDate = eventItemList.map((item) => item.event_date);

    for (i = 0; i < eventDate.length; i++) {
      if (selectedDate == eventDate[i]) {
        eventItemList.map((item) => {});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => getOnPressEvent(day)}
        hideArrows={false}
        enableSwipeMonths={true}
        markedDates={markedDate}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#000000',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#000000',
          selectedDotColor: '#ffffff',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
