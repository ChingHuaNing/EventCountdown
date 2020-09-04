import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'event_db.db', createFromLocation: 1});

export default function CalendarScreen({route, navigation}) {
  let [selectedEvents, setSelectedEvents] = useState([]);
  let [selectedDate, setSelectedDate] = useState('');
  let [eventItemList, setEventItemList] = useState([]);
  let [eventDates, setEventDates] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_event', [], (tx, result) => {
        if (result.rows.length > 0) {
          var tempEventList = [];
          for (i = 0; i < result.rows.length; i++) {
            tempEventList.push(result.rows.item(i));
          }
          setEventItemList(tempEventList);
        }
      });
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT event_date FROM table_event', [], (tx, result) => {
        if (result.rows.length > 0) {
          var tempList = [];
          for (i = 0; i < result.rows.length; i++) {
            tempList.push(result.rows.item(i));
          }
          setEventDates(tempList);
        }
      });
    });
  }, []);

  const markDates = () => {
    const markedDates = {};

    for (i = 0; i < eventDates.length; i++) {
      markedDates[eventDates[i].event_date] = {
        selected: true,
        marked: true,
        dotColor: '#000',
        selectedColor: '#ffff80',
      };
    }
    console.log('MarkedDates', markedDates);
    return markedDates;
  };

  let listEventItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.text}>Event: {item.event_title}</Text>
          <Text style={styles.text}>Time: {item.event_time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // when date is selected
  const getOnPressEvent = (day) => {
    let markedDate = {};
    let selectedDate = moment(day.dateString);
    selectedDate = selectedDate.format('YYYY-MM-DD');
    setSelectedDate(selectedDate);

    //filter event items
    let tempSelectedEvents = eventItemList.filter(
      (item) => item.event_date === selectedDate,
    );
    setSelectedEvents(tempSelectedEvents);
  };

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          onDayPress={(day) => getOnPressEvent(day)}
          hideArrows={false}
          enableSwipeMonths={true}
          markedDates={markDates()}
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
      <View style={styles.listContainer}>
        <FlatList
          data={selectedEvents}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => listEventItem(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    flex: 1,
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    backgroundColor: '#FDFDA1',
  },
});
