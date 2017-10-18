import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import { FormValidationMessage } from 'react-native-elements';

class ValidationMessage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.errorMessage) {
      return (
        <FormValidationMessage
          containerStyle={this.props.containerStyle}
          labelStyle={this.props.labelStyle}
          fontFamily={this.props.fontFamily}>
          {this.props.errorMessage}
        </FormValidationMessage>
      )
    } else {
      return null
    }
  }
}

export default ValidationMessage;