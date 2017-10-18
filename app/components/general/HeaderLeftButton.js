import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  AsyncStorage,
  ScrollView
} from 'react-native';

class ButtonContent extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.label) {
      if (typeof this.props.label === 'function') {
        return this.props.label()
      } else {
        return <Text style={[styles.text, this.props.textStyle]}>{this.props.label}</Text>
      }
    } else {
      return (
        <Text style={[styles.text, this.props.textStyle]}>Back</Text>
      )
    }
  }
}

class HeaderLeftButton extends React.Component {

  constructor(props) {
    super(props)
  }

  _onPress = () => {
    if (this.props.action) {
      this.props.action()
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._onPress} >
          <ButtonContent
            {...this.props}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },
});

export default HeaderLeftButton;