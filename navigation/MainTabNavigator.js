import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SkillsScreen from '../screens/SkillsScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import SpellsScreen from '../screens/SpellsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
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

const SkillsStack = createStackNavigator({
  Skills: SkillsScreen,
});

SkillsStack.navigationOptions = {
  tabBarLabel: 'Skills',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const FeaturesStack = createStackNavigator({
  Features: FeaturesScreen,
});

FeaturesStack.navigationOptions = {
  tabBarLabel: 'Features',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const SpellsStack = createStackNavigator({
  Spells: SpellsScreen,
});

SpellsStack.navigationOptions = {
  tabBarLabel: 'Spells',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
     focused={focused}
     name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
  )
}

export default createBottomTabNavigator({
  HomeStack,
  SkillsStack,
  FeaturesStack,
  SpellsStack
});
