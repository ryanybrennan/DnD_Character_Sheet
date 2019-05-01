import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import StartScreen from './screens/Start';
import firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  // componentWillMount(){
  //   const config = {
  //     apiKey: "AIzaSyD_NjLupQ18Q9g8UbFlGFWT8BXFiLhmXv0",
  //     authDomain: "dnd-character-sheet-e5503.firebaseapp.com",
  //     databaseURL: "https://dnd-character-sheet-e5503.firebaseio.com",
  //     projectId: "dnd-character-sheet-e5503",
  //     storageBucket: "dnd-character-sheet-e5503.appspot.com",
  //     messagingSenderId: "742729858269"
  //   };
  //   firebase.initializeApp(config);
  // }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={createStore(reducers)}>
          <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
          {/* <StartScreen /> */}
        </View>
        </Provider>
        
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '80%'
  },
});
