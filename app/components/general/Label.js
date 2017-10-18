import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import { FormLabel } from 'react-native-elements';

class Label extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.label) {
      return (
        <FormLabel
          containerStyle={this.props.containerStyle}
          labelStyle={this.props.labelStyle}
          fontFamily={this.props.fontFamily}
        >
          {this.props.label}
        </FormLabel>
      )
    } else {
      return null
    }
  }
}

export default Label;