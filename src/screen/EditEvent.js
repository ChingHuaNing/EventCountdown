import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function EditEvent(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Event Tab</Text>
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

export default EditEvent;
