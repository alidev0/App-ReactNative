import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Aaa from '../AAA';
import Bbb from '../BBB';

import LoginScreen from '../screens/LoginScreen';

const MainNavigator = createStackNavigator({

  LoginSc: { screen: LoginScreen },

    Abc: { screen: Aaa },

    Bnm: { screen: Bbb },

});

const App = createAppContainer(MainNavigator);

export default App;
