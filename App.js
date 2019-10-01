import React, {Component} from 'react';
import {View} from 'react-native';

import AppNavigator from './appNavigator/AppNavigator';

class App extends Component {

  render() {
    return (
      <View style={{flex:1}}>
        <AppNavigator/>
      </View>
    );
  }
}

export default App;
