import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screen/Home';
import PastEvent from '../screen/PastEvent';
import AddEvent from '../screen/AddEvent';
import EditEvent from '../screen/EditEvent';
import EventDetails from '../screen/EventDetails';
import Calendar from '../screen/Calendar';
import Settings from '../screen/Settings';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
          name="Home"
          component={MainTabNavigator}
          options={{title: 'My Days'}}
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
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{title: 'Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#101010', // font color for active bar
        style: {
          backgroundColor: '#ffff80', // color of tab
        },
      }}>
      <Tab.Screen
        name="Future Events"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-hourglass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Past Events"
        component={PastEvent}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-time-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainStackNavigator;
