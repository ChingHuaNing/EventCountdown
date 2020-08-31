import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';

function Item({item}) {
  return (
    <View style={styles.listItem}>
      <ImageBackground source={{uri: item.photo}} style={styles.image}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
          <Text>{item.position}</Text>
          <Text>{item.position}</Text>
          <Text>{item.position}</Text>
          <Text>{item.position}</Text>
          <Text>{item.position}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default class Home extends React.Component {
  state = {
    data: [
      {
        name: 'Miyah Myles',
        email: 'miyah.myles@gmail.com',
        position: 'Data Entry Clerk',
        photo:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
      },
      {
        name: 'June Cha',
        email: 'june.cha@gmail.com',
        position: 'Sales Manager',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        name: 'Iida Niskanen',
        email: 'iida.niskanen@gmail.com',
        position: 'Sales Manager',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        name: 'Renee Sims',
        email: 'renee.sims@gmail.com',
        position: 'Medical Assistant',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      },
      {
        name: 'Jonathan Nu\u00f1ez',
        email: 'jonathan.nu\u00f1ez@gmail.com',
        position: 'Clerical',
        photo: 'https://randomuser.me/api/portraits/men/43.jpg',
      },
      {
        name: 'Sasha Ho',
        email: 'sasha.ho@gmail.com',
        position: 'Administrative Assistant',
        photo:
          'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb',
      },
      {
        name: 'Abdullah Hadley',
        email: 'abdullah.hadley@gmail.com',
        position: 'Marketing',
        photo:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f',
      },
      {
        name: 'Thomas Stock',
        email: 'thomas.stock@gmail.com',
        position: 'Product Designer',
        photo:
          'https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg',
      },
      {
        name: 'Veeti Seppanen',
        email: 'veeti.seppanen@gmail.com',
        position: 'Product Designer',
        photo: 'https://randomuser.me/api/portraits/men/97.jpg',
      },
      {
        name: 'Bonnie Riley',
        email: 'bonnie.riley@gmail.com',
        position: 'Marketing',
        photo: 'https://randomuser.me/api/portraits/women/26.jpg',
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{flex: 1}}
          data={this.state.data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={(item) => item.email}
        />

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '90%',
    height: '50%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
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
