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
import shapes from '../assets/styles/Shapes';
import StatCard from '../components/StatCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
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
          <View style={styles.scoresRow1}>
            <StatCard name="Strength" score={17} modifier={3} savingThrow={3} />
            <StatCard name="Dexterity" score={8} modifier={-1} savingThrow={-1} />
            <StatCard name="Constitution" score={14} modifier={2} savingThrow={2} />
          </View>
          <View style={styles.scoresRow1}>
            <StatCard name="Intelligence" score={10} modifier={0} savingThrow={0} />
            <StatCard name="Wisdom" score={14} modifier={2} savingThrow={4} />
            <StatCard name="Charisma" score={16} modifier={3} savingThrow={6} />
          </View>
          <View style={styles.scoresRow1}>
            <View style={shapes.CircleShapeView}>
              <Text>Proficiency Bonus</Text>
              <Text>2</Text>
            </View>
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

