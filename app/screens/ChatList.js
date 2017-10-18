import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  AsyncStorage,
} from 'react-native';
import { resetAction, MainNavigator } from '../config/react-navigation';
import { NavigationActions } from 'react-navigation';
import { Button, List, ListItem } from 'react-native-elements';
import TextInput from '../components/general/TextInput';

const placeholderList = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]

class AppLoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nickName: null,
      nickNameError: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Chat List',
    header: navigation.state.params ? navigation.state.params.isHeaderShow : undefined,
    headerStyle: { backgroundColor: '#ecf0f1' },
    headerTitleStyle: { color: '#2c3e50' },
    headerTintColor: '#2c3e50',
  });

  _chat = (id, name) => {
    console.log('Connecting')
    this.props.navigation.navigate('Chat', { id: id, name: name })
  }

  render() {
    return (
      <View style={styles.container}>
        <List containerStyle={{marginBottom: 20}}>
          {
            placeholderList.map((l, i) => (
              <ListItem
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={l.name}
                onPress={() => this._chat(i, l.name)}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

styles = StyleSheet.create({
  contianer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  font: {
    fontFamily: 'Avenir',
  },
})

export default AppLoginScreen;