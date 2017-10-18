import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Modal,
} from 'react-native';

class LoadingSpinner extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  render() {
    // const timer = this.props.timer? this.props.timer: 1000
    return (
      this.props.visible && <Modal transparent={true} visible={this.props.visible} >
        <View style={styles.loading}>
          <ActivityIndicator size='large'/>
          <Text style={styles.loadingText}>{this.props.loadingText? this.props.loadingText: 'Loading ...'}</Text>
        </View>
      </Modal>
    )
  }
}

styles = StyleSheet.create({
  loading: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 9,
  },
  loadingText: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontSize: 18
  }
})

export default LoadingSpinner;