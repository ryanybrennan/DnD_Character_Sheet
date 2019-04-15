import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import styles from '../assets/styles/CharSheet';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      language: String
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>Character 1</Text>
            <View style={styles.bannerTextRow1}>
            <Text>Experience: 4500</Text>
            <Text>AC: 18</Text>
            <Text>Race: Human</Text>
            </View>
            <View style={styles.bannerTextRow2}>
              <Text>Level: 4</Text>
              <Text>Health: 43</Text>
              <Text>Class: Paladin</Text>
            </View>
          </View>
          <View>
            <Text>Strength</Text>
          </View>
          <View>
            <Text>Dexterity</Text>
          </View>
          <View>
            <Text>Constitution</Text>
          </View>
          <View>
            <Text>Intelligence</Text>
          </View>
          <View>
            <Text>Wisdom</Text>
          </View>
          <View>
            <Text>Charisma</Text>
          </View>
        

          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate('Start')}
            />
        </ScrollView>
      </View>
    );
  }
}

