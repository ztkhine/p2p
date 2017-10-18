import React, { Component } from 'react';
import { AppRegistry, StatusBar, AsyncStorage } from 'react-native';
import { AppNavigator } from './config/react-navigation';

StatusBar.setBarStyle('light-content', true);

export default class App extends Component {

  render() {
    return <AppNavigator />;
  }

}
