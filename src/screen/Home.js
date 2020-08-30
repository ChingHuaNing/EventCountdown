import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

function Home(props) {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Tab</Text>
      <TouchableOpacity // add button to see event details (temporary)
        onPress={() => navigation.navigate('EventDetails')}>
        <Text>EventDetails</Text>
      </TouchableOpacity>
      <TouchableOpacity // add button to add new event
        onPress={() => navigation.navigate('AddEvent')}
        style={styles.fab}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#a13fe8',
    borderRadius: 30,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 30,
    color: 'white',
  },
});

export default Home;
