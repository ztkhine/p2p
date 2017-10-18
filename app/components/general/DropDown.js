import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import TextInput from './TextInput';
import ModalDropdown from 'react-native-modal-dropdown';
import { Button, Icon } from 'react-native-elements';
import ValidationMessage from './ValidationMessage';
import Label from './Label';

class DropDown extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultValue: this.props.defaultValue? this.props.defaultValue: 'Select one from the list ...',
      caret: 'caret-down'
    }
  }

  _renderRow = (rowData, rowID, highlighted) => {
    if (this.props.renderRow) {
      return this.props.renderRow(rowData, rowID, highlighted)
    }
    return (
      <TouchableHighlight underlayColor='cornflowerblue'>
        <View style={[styles.dropdown_row]}>
          <Text style={[styles.dropdown_row_text, highlighted && styles.selected_text]}>
            {`${rowData.name}`}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    if (this.props._renderSeparator) {
      return this.props.renderSeparator(sectionID, rowID, adjacentRowHighlighted)
    }
    return (
      <View style={styles.dropdown_seprator} />
    )
  }

  _adjustFrame = (style) => {
    let {height, width} = Dimensions.get('window'),
        totalSidePadding = ( this.props.parentContainerSidePadding * 2 ) + 40,
        contentHeight = ( this.props.options.length * 30 ) + ( this.props.options.length * 1 );
    Object.assign(style, { width: width - totalSidePadding, height: contentHeight, top: style.top - 20 })
    return style
  }

  _onSelect = (index, jsonVal) => {
    if (this.props.onSelect) {
      this.props.onSelect(jsonVal.value)
    }
    this.setState({ defaultValue: jsonVal.name })
  }

  _onDropdownShow = () => {
    // do on focus
    if (this.props.onFocus) {
      this.props.onFocus()
    }
    this.setState({ caret: 'caret-up' })
  }

  _onDropdownHide = () => {
    this.setState({ caret: 'caret-down' })
  }

  render() {
    return (
      <ModalDropdown
        ref={modalDropDown => this.modalDropDown = modalDropDown}
        options={this.props.options}
        style={styles.select_container}
        textStyle={[styles.select_text_style, this.props.textStyle]}
        dropdownStyle={[this.props.dropdownStyle]}
        renderRow={this._renderRow.bind(this)}
        renderSeparator={this._renderSeparator.bind(this)}
        adjustFrame={this._adjustFrame.bind(this)}
        onSelect={this._onSelect.bind(this)}
        onDropdownWillShow={this._onDropdownShow.bind(this)}
        onDropdownWillHide={this._onDropdownHide.bind(this)}
      >
        <Label
          containerStyle={styles.labelContainer}
          label={this.props.label}
          fontFamily={'Avenir'}
        />
        <View style={[styles.custom_select_container, this.props.style]}>
          <Text style={styles.custom_select_text}>
            {this.state.defaultValue}
          </Text>
          <Icon style={styles.custom_select_caret} iconStyle={styles.icon_style} size={15} type='font-awesome' name={this.state.caret} color='#bdc3c7' />
        </View>
        <ValidationMessage
          containerStyle={styles.errorContainer}
          errorMessage={this.props.errorMessage}
          fontFamily={'Avenir'}
        />
      </ModalDropdown>
    )
  }
}

styles = StyleSheet.create({
  // custom container
  custom_select_container: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 2.5,
  },
  custom_select_text: {
    flex: 3,
    alignSelf: 'flex-start',
    color: '#bdc3c7',
    fontSize: 16,
  },
  custom_select_caret: {
    flex: 1,
  },
  // for error message to match with text input
  errorContainer: {
    marginLeft: -20,
  },
  // for label to match with text input
  labelContainer: {
    marginLeft: -20,
  },
  // general icon
  icon_style: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  select_container: {
    width: '100%',
    // make it so that it matches the text input
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  select_text_style: {
    fontFamily: 'Avenir',
  },
  dropdown_row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },
  dropdown_seprator: {
    height: 0.5,
    backgroundColor: '#bdc3c7'
  },
  dropdown_row_text: {
    fontFamily: 'Avenir',
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  // selected text style
  selected_text: {
    color: '#1abc9c',
  },
})

export default DropDown;