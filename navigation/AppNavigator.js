import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import StartScreen from '../screens/Start';
import PickRace from '../screens/PickRace';

const AppNavigator = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Start: {
    screen: StartScreen,
  },
  Main: {
    screen: MainTabNavigator,
  },
  PickRace: {
    screen: PickRace
  }

});

export default createAppContainer(AppNavigator);