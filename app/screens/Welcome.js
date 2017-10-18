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

class WelcomeScreen extends React.Component {

  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loadingText: 'Loading ...',
    }
  }

  render() {
    return <WelcomeView navigation={this.props.navigation} />;
  }

}

class WelcomeView extends React.Component {

  _signUp = () => {
    this.props.navigation.navigate('Register')
  }

  _login = () => {
    this.props.navigation.navigate('AppLogin')
  }
  render() {
    // clear the async
    AsyncStorage.getAllKeys((error, keys) => {
      AsyncStorage.multiRemove(keys);
    });
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.button_container}>
          <View style={styles.sub_button_container}>
            <Button
              buttonStyle={styles.login_button}
              containerViewStyle={styles.individual_button_container}
              textStyle={styles.login_button_text}
              title="Log In"
              fontFamily='Avenir'
              fontSize={14}
              onPress={this._login} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  job_fair: {
    position: 'absolute',
    top: 190,
  },
  year: {
    position: 'absolute',
    top: 215,
  },
  background_image: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button_container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: 'transparent'
  },
  sub_button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  individual_button_container: {
    flex: 1,
  },
  login_button: {
    flex: 1,
    width: 100,
    borderRadius: 5,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#1abc9c',
    backgroundColor: '#ffffff',
  },
  login_button_text: {
    color: '#1abc9c'
  },
  signup_button_text: {
    color: '#ffffff',
  },
  signup_button: {
    flex: 1,
    width: 100,
    borderRadius: 5,
    alignSelf: 'flex-end',
    borderWidth: 1,
    backgroundColor: '#1abc9c',
    borderColor: '#1abc9c',
  }
});

export default WelcomeScreen;
