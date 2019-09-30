import React, {Component} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AAA from './AAA';

import AppNavigator from './appNavigator/AppNavigator';

class ClassName extends Component {

  userName;
  psw;
  inputFun = (x, y) => {
    if(y === 0){
      userName = x;
    }else{
      psw = x;
    }
  }

  navigationVar = this.props.navigation;

  render() {

    return (
      <View style={{flex:1}}>
        <AppNavigator/>
      </View>

    );
  }
}

export default ClassName;
