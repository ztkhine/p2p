import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage
} from 'react-native';
import { FormInput } from 'react-native-elements';
import ValidationMessage from './ValidationMessage';
import Label from './Label';

class DefaultText extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    {
      if (this.props.defaultValue !== '') {
        return (
          <FormInput
            autoCapitalize={'none'}
            style={[styles.input, this.props.inputStyle]}
            value={this.props.defaultValue}
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            placeholder={this.props.placeHolder}
            onChangeText={(text) => this.props.onChangeText(text)}
            onFocus={() => this.props.onFocus()}
            multiline = {this.props.textArea? true: false}
            secureTextEntry = {this.props.secureText? true: false}
            numberOfLines={this.props.textArea? 4: 0}
          />
        )
      }else {
        return (
          <FormInput
            autoCapitalize={'none'}
            style={[styles.input, this.props.inputStyle]}
            autoCorrect={false}
            keyboardType={this.props.keyboardType}
            placeholder={this.props.placeHolder}
            onChangeText={(text) => this.props.onChangeText(text)}
            onFocus={() => this.props.onFocus()}
            multiline = {this.props.textArea? true: false}
            secureTextEntry = {this.props.secureText? true: false}
            numberOfLines={this.props.textArea? 4: 0}
          />
        )
      }
    }
  }
}

class TextInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: null
    };
  }

  _onChangeText = (text) => {
    if(this.props.onChange){
      this.props.onChange(text)
    }
    this.setState({ value: text })
  }

  _onFocus = () => {
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Label
          label={this.props.label}
        />
        <DefaultText
          keyboardType={this.props.keyboardType}
          inputStyle={this.props.inputStyle}
          defaultValue={this.props.defaultValue? this.props.defaultValue: ''}
          placeHolder={this.props.placeHolder}
          onChangeText={(text) => this._onChangeText(text)}
          secureText={this.props.secureText? true: false}
          onFocus={() => this._onFocus()}
        />
        <ValidationMessage
          errorMessage={this.props.errorMessage}
        />
      </View>
    )
  }
}

styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    width: '100%',
  }
})

export default TextInput;