import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import {StyleSheet} from 'react-native';

import FutureEvent from '../screen/FutureEvent';
import AddEvent from '../screen/AddEvent';
import EditEvent from '../screen/EditEvent';
import EventDetails from '../screen/EventDetails';
import Calendar from '../screen/Calendar';
const Stack = createStackNavigator();

function MainStackNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FutureEvent"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffff80',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center',
          },
          headerTintColor: '#000000',
          headerBackTitleVisible: false,
        }}
        // let the navigation bar stick on top
        headerMode="float">
        <Stack.Screen
          name="FutureEvent"
          component={FutureEvent}
          options={({navigation}) => ({
            title: 'My Days',
            headerRight: () => (
              // Calendar icon
              <Icon
                onPress={() => navigation.navigate('Calendar')}
                containerStyle={styles.icon}
                name="ios-calendar-sharp"
                type="ionicon"
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddEvent"
          component={AddEvent}
          options={{title: 'Add New Event'}}
        />
        <Stack.Screen
          name="EditEvent"
          component={EditEvent}
          options={{title: 'Edit Event'}}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetails}
          options={{title: 'Event Details'}}
        />
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{title: 'Calendar'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
});

export default MainStackNavigator;
