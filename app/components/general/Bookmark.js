import React, { PropTypes, Component } from 'react';
import { View, StyleSheet, Platform, Image, TouchableWithoutFeedback } from 'react-native';
import fonts from 'react-native-elements/src/config/fonts';
import colors from 'react-native-elements/src/config/colors';
import Text from 'react-native-elements/src/text/Text';
import Divider from 'react-native-elements/src/divider/Divider';
import normalize from 'react-native-elements/src/helpers/normalizeText';
import { Icon } from 'react-native-elements';
import ApiClient, { HOME_URL } from '../../lib/ApiClient';

class Bookmark extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShortlisted: this.props.isShortlisted
    }
  }

  addBookmark = () => {
    console.log(this.props)
    const topLvlThis = this
    ApiClient.fetchText(`${HOME_URL}${this.props.addShortlistUrl}`, {}, 'GET').then(function(text){
      if(text === 'ok'){
        topLvlThis.setState({ isShortlisted: true })
      }else{
        alert('Fail to shortlist')
      }
      console.log(text)
    }, function(error){
      console.log(error);
    });
  }

  removeBookmark = () => {
    console.log(this.props)
    const topLvlThis = this
    ApiClient.fetchText(`${HOME_URL}${this.props.removeShortlistUrl}`, {}, 'GET').then(function(text){
      if(text === 'ok'){
        topLvlThis.setState({ isShortlisted: false })
      }else{
        alert('Fail to shortlist')
      }
      console.log(text)
    }, function(error){
      console.log(error);
    });
  }

  render() {
    if(this.state.isShortlisted){
      return (
        <TouchableWithoutFeedback hitSlop={{bottom: 15,right:15}} onPress={() => this.removeBookmark()}>
          <Icon size={15} style={this.props.style} type='font-awesome' name='times' color='#1abc9c' />
        </TouchableWithoutFeedback>
      )
    }else{
      return (
        <TouchableWithoutFeedback hitSlop={{bottom: 15,right:15}} onPress={() => this.addBookmark()}>
          <Icon size={15} style={this.props.style} type='font-awesome' name='bookmark' color='#1abc9c' />
        </TouchableWithoutFeedback>
      )
    }
  }
}

export default Bookmark;