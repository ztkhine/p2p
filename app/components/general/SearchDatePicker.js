import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ValidationMessage from './ValidationMessage';
import Label from './Label';

class CustomDateButton extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let indicator = null;
    if (this.props.indicator) {
      indicator = <Text style={styles.indicator}>▼</Text>;
    }

    return(
      <View style={this.props.style}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View>
            <Text style={styles.placeholder}>{this.props.placeholder}</Text>
          </View>
        </TouchableWithoutFeedback>
        { indicator }
        <View style={styles.divider} />
      </View>
    )
  }
}

class SearchDatePicker extends Component {

  constructor(props){
    super(props)
  }

  state = {
    datePickerVisible: false,
    // endDatePickerVisible: false,
    selectedDate: null,
    // endDate: null,
    datePlaceholder: this.props.datePlaceholder? this.props.datePlaceholder: 'Select Date',
    // endDatePlaceholder: 'End Date',
  };

  _showDatePicker = () => {
    // do on focus
    if (this.props.onFocus) {
      this.props.onFocus()
    }
    this.setState({ datePickerVisible: true })
  };
  // _showEndDatePicker = () => this.setState({ endDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ datePickerVisible: false });
  // _hideEndDatePicker = () => this.setState({ endDatePickerVisible: false });

  _datePicked = (date) => {
    this.props.setDate(moment(date).unix())
    this.setState({selectedDate: date, datePlaceholder: moment(date).format('D MMM YYYY')});
    this._hideDatePicker();
  };

  // _endDatePicked = (date) => {
  //   this.props.endDate(moment(date).unix())
  //   this.setState({endDate: date, endDatePlaceholder: moment(date).format('D MMM YYYY')});
  //   this._hideEndDatePicker();
  // };

  render() {
    return(
      <View style={[styles.container, this.props.styles]}>
        <Label
          containerStyle={styles.labelContainer}
          label={this.props.label}
        />
        <View style={styles.date_container}>
          <CustomDateButton
            style={styles.date_button_containers}
            onPress={this._showDatePicker}
            placeholder={this.state.datePlaceholder}
          />
          <ValidationMessage
            containerStyle={styles.errorContainer}
            errorMessage={this.props.errorMessage}
            fontFamily={'Avenir'}
          />
        </View>
        <DateTimePicker
          date={this.props.initDate || new Date()}
          maximumDate={new Date()}
          isVisible={this.state.datePickerVisible}
          onConfirm={this._datePicked}
          onCancel={this._hideDatePicker}
          mode='date' />
      </View>
    )
  }

  // render() {
  //   return(
  //     <View style={[styles.container, this.props.styles]}>
  //       <Text style={styles.label}>{this.props.label}</Text>
  //       <View style={styles.date_container}>
  //         <CustomDateButton
  //           style={styles.date_button_containers}
  //           onPress={this._showStartDatePicker}
  //           placeholder={this.state.startDatePlaceholder} />
  //         <Text style={styles.to}>to</Text>
  //         <CustomDateButton
  //           style={styles.date_button_containers}
  //           onPress={this._showEndDatePicker}
  //           placeholder={this.state.endDatePlaceholder}
  //           indicator />
  //       </View>
  //       <DateTimePicker
  //         maximumDate={this.state.endDate}
  //         isVisible={this.state.startDatePickerVisible}
  //         onConfirm={this._startDatePicked}
  //         onCancel={this._hideStartDatePicker}
  //         mode='date' />
  //       <DateTimePicker
  //         minimumDate={this.state.startDate}
  //         isVisible={this.state.endDatePickerVisible}
  //         onConfirm={this._endDatePicked}
  //         onCancel={this._hideEndDatePicker}
  //         mode='date' />
  //     </View>
  //   )
  // }
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 5,
//   },
//   date_container: {
//     flexDirection: 'row',
//   },
//   date_button_containers: {
//     width: '42%',
//   },
//   to: {
//     marginTop: 8,
//     marginRight: 20,
//     marginLeft: 20,
//     color: '#929292',
//   },
//   label: {
//     color: '#929292',
//     fontFamily: 'Avenir',
//     fontSize: 11,
//     fontWeight: '500',
//   },
// });

const styles = StyleSheet.create({
  // custom date button
  placeholder: {
    color: '#bdc3c7',
    fontSize: 16,
  },
  divider: {
    borderColor: '#eeeeee',
    borderTopWidth: 1.5,
    marginTop: 10,
    marginBottom: 10,
  },
  indicator: {
    width: 11,
    height: 11,
    fontSize: 11,
    color: '#bdc3c7',
    position: 'absolute',
    right: 8,
    top: '20%',
  },
  // error container
  errorContainer: {
    // to match the text input
    marginLeft: -20,
  },
  // label container
  labelContainer: {
    // to match the text input
    marginLeft: -20,
  },
  container: {
    // make it so that it matches the text input
    paddingLeft: 20,
    paddingRight: 20,
  },
  date_container: {
    width: '100%',
    marginBottom: 20,
  },
  date_button_containers: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    color: '#929292',
    fontFamily: 'Avenir',
    fontSize: 11,
    fontWeight: '500',
  },
});

export default SearchDatePicker;
