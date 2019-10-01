import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import MapScreen from '../screens/MapScreen';

const MainNavigator = createStackNavigator({

  LoginSc: { screen: LoginScreen },
  ListSc: { screen: ListScreen },
  MapSc: { screen: MapScreen },

});

const App = createAppContainer(MainNavigator);

export default App;
