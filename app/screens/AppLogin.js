import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native';
import { resetAction, MainNavigator } from '../config/react-navigation';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import TextInput from '../components/general/TextInput';
import Pusher from 'pusher-js/react-native';
import pusherConfig from '../config/pusher.json';

class AppLoginScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      nickName: null,
      nickNameError: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    header: navigation.state.params ? navigation.state.params.isHeaderShow : undefined,
    headerStyle: { backgroundColor: '#ecf0f1' },
    headerTitleStyle: { color: '#2c3e50' },
    headerTintColor: '#2c3e50',
  });

  _connect = () => {
    //this.props.navigation.navigate('ChatClient')
    this.props.navigation.navigate('ChatList')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.text_container}>
          <Text style={[styles.font]}>Welcome to chat</Text>
          <Text style={[styles.font]}>Enter the nick name below and start chatting</Text>
        </View>
        <View style={styles.form_container}>
          <TextInput
            label=''
            // containerStyle={styles.input_container}
            placeHolder='Nick Name'
            defaultValue={this.state.nickName}
            onChange={(text) => this.setState({ nickName: text})}
            onFocus={() => this.setState({ nickNameError: null })}
          />
          <Button
            onPress={this._connect}
            buttonStyle={{backgroundColor: 'green', borderRadius: 5}}
            textStyle={{textAlign: 'center'}}
            title={'Connect'}
          />
        </View>
      </View>
    )
  }
}

// styles = StyleSheet.create({
//   contianer: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   font: {
//     fontFamily: 'Avenir',
//   },
//   text_container: {
//     flex: 1,
//   },
//   form_container: {
//     flex: 1,
//   }
// })

export default AppLoginScreen;