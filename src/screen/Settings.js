import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function Settings(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Setting Tab</Text>
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
});

export default Settings;
