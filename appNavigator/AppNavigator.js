import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen'

const MainNavigator = createStackNavigator({

  LoginSc: { screen: LoginScreen },
  ListSc: { screen: ListScreen },

});

const App = createAppContainer(MainNavigator);

export default App;
