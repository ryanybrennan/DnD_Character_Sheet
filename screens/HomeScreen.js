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
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import { selectChar } from '../actions/index';

import { MonoText } from '../components/StyledText';
import styles from '../assets/styles/CharSheet';
import shapes from '../assets/styles/Shapes';
import StatCard from '../components/StatCard';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
  };

  constructor(props) {
    super(props);
    // this.state = ({
    //   character: {}
    // })
  }

  componentDidMount(){
    // this.setState({character: this.props.navigation.getParam('character')});
    // this.props.navigation.setParams({character: this.props.character})
    // console.log(this.props);
    // this.props.selectChar(charId)
  }

  componentDidUpdate(){
    // this.setState({character: this.props.navigation.getParam('character')});
  }

  calcModifier(abilityscore){
    const modifier = Math.floor((abilityscore-10)/2)
    return modifier;
  }

  renderStatsRow1(){
    const scores = this.props.character.abilityscores;
    const row1 = scores.slice(0,(scores.length/2));
    return row1.map((score, index) => 
      <StatCard key={index} name={score.name} score={score.score} modifier={this.calcModifier(score.score)} savingThrow={this.calcModifier(score.score)} />
    ) 
  }

  renderStatsRow2(){
    const scores = this.props.character.abilityscores;
    const row2 = scores.slice((scores.length/2),scores.length);
    return row2.map((score, index) => 
      <StatCard key={index} name={score.name} score={score.score} modifier={this.calcModifier(score.score)} savingThrow={this.calcModifier(score.score)} />
    ) 
  }

  render() {
    // console.log(this.props);
    const character = this.props.character;
    // const character = this.props.navigation.getParam('character');
    // const character = this.state.character;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.banner}>
            <Text style={styles.bannerTitle}>{character.name}</Text>
            <View style={styles.bannerTextRow1}>
            <Text>Experience: {character.experience}</Text>
            <Text>AC: {character.armorclass}</Text>
            <Text>Race: {character.race}</Text>
            </View>
            <View style={styles.bannerTextRow2}>
              <Text>Level: {character.level}</Text>
              <Text>Health: {character.health}</Text>
              <Text>Class: {character.class}</Text>
            </View>
          </View>
          <View style={styles.scoresRow1}>
          {this.renderStatsRow1()}
            {/* <StatCard name="Strength" score={character.abilityscores[0]} modifier={this.calcModifier(character.abilityscores[0])} savingThrow={this.calcModifier(character.abilityscores[0])} />
            <StatCard name="Dexterity" score={character.abilityscores[1]} modifier={this.calcModifier(character.abilityscores[1])} savingThrow={this.calcModifier(character.abilityscores[1])} />
            <StatCard name="Constitution" score={character.abilityscores[2]} modifier={this.calcModifier(character.abilityscores[2])} savingThrow={this.calcModifier(character.abilityscores[2])} /> */}
          </View>
          <View style={styles.scoresRow1}>
          {this.renderStatsRow2()}
            {/* <StatCard name="Intelligence" score={character.abilityscores[3]} modifier={this.calcModifier(character.abilityscores[3])} savingThrow={this.calcModifier(character.abilityscores[3])} />
            <StatCard name="Wisdom" score={character.abilityscores[4]} modifier={this.calcModifier(character.abilityscores[4])} savingThrow={this.calcModifier(character.abilityscores[4])} />
            <StatCard name="Charisma" score={character.abilityscores[5]} modifier={this.calcModifier(character.abilityscores[5])} savingThrow={this.calcModifier(character.abilityscores[5])} /> */}
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

// const {navigation} = this.props;
// const charId = navigation.getParam('charId')

const mapStateToProps = (state, props) => {
  // console.log(state);
  const character =  state.characters.find(x => x.id === props.navigation.getParam('charId'))
  return {character: character};
  // return {characters: state.characters};
}


export default connect(mapStateToProps, {selectChar})(withNavigation(HomeScreen));

