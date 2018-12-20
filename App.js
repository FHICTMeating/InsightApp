import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomScreen';
import StartGameScreen from './screens/StartGameScreen';
import StatementScreen from './screens/StatementScreen';

const AppStack = createStackNavigator({ home: WelcomeScreen })

export default createAppContainer(createSwitchNavigator(
  {
    Auth: LoadingScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

