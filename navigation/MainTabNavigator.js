import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SkillsScreen from '../screens/SkillsScreen';
import RFeaturesScreen from '../screens/RacialFeaturesScreen';
import SpellsScreen from '../screens/SpellsScreen';
import CFeaturesScreen from '../screens/ClassFeaturesScreen';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

HomeScreen.navigationOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

// const SkillsStack = createStackNavigator({
//   Skills: SkillsScreen,
// });

SkillsScreen.navigationOptions = {
  title: 'Skills',
  tabBarLabel: 'Skills',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

// const FeaturesStack = createStackNavigator({
//   Features: FeaturesScreen,
// });

RFeaturesScreen.navigationOptions = {
  title: 'Racial Features',
  tabBarLabel: 'Racial Features',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

CFeaturesScreen.navigationOptions = {
  title: 'Class Features',
  tabBarLabel: 'Class Features',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

// const SpellsStack = createStackNavigator({
//   Spells: SpellsScreen,
// });

SpellsScreen.navigationOptions = {
  title: 'Spells',
  tabBarLabel: 'Spells',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
     focused={focused}
     name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
  )
}

export default createBottomTabNavigator({
  HomeScreen,
  SkillsScreen,
  RFeaturesScreen,
  CFeaturesScreen,
  SpellsScreen,
});
