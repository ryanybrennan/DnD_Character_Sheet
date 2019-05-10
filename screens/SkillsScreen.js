import React from 'react';
import { ScrollView, StyleSheet, View, Text, SectionList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../assets/styles/CharSheet';
import shapes from '../assets/styles/Shapes';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';
import * as actions from '../actions/index';

class SkillsScreen extends React.Component {
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = ({
      prof: Boolean,
      skills: [],
      character: {}
    })
  }
  static navigationOptions = {
    title: 'Skills',
  };
  componentWillMount(){
    this.setState({character: this.props.navigation.getParam('character')});
    this._isMounted = true;
    axios.get("http://dnd5eapi.co/api/skills")
    .then(response => response.data)
    .then(responseJson => {
      if (this._isMounted){
        console.log(responseJson.results);
        this.setState({
          skills: responseJson.results,
        })
      }
    })
    .catch((error) => console.log(error))
  }

  
  componentDidUpdate(){
    // this.setState({character: this.props.navigation.getParam('character')});
  }

  calcModifier(abilityscore){
    const modifier = Math.floor((abilityscore-10)/2)
    return modifier;
  }
  getSkills(){
    
  }
  

  render() {
    // console.log(this.props);
    // const character = this.props.navigation.getParam('character');
    const character = this.state.character;
    return (
    <View style={stylesCont.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly', flexDirection: 'row', height: '100%', width:'100%'}}>
        <ScrollView>
            <SectionList
              renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
              renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
              )}
              sections={[
              {title: 'Str-based Skills', data: ['Athletics: '+this.calcModifier(character.abilityscores[0].score)]},
              {title: 'Dex-based Skills', data: ['Acrobatics: '+this.calcModifier(character.abilityscores[1].score), 'Sleight of Hand: '+this.calcModifier(character.abilityscores[1].score), 'Stealth: '+this.calcModifier(character.abilityscores[1].score)]},
              {title: 'Int-based Skills', data: ['Arcana: '+this.calcModifier(character.abilityscores[3].score), 'History: '+this.calcModifier(character.abilityscores[3].score), 'Investigation: '+this.calcModifier(character.abilityscores[3].score), 'Nature: '+this.calcModifier(character.abilityscores[3].score), 'Religion: '+this.calcModifier(character.abilityscores[3].score)]},
              {title: 'Wis-based Skills', data: ['Animal Handling: '+this.calcModifier(character.abilityscores[4].score), 'Insight: '+this.calcModifier(character.abilityscores[4].score), 'Medicine: '+this.calcModifier(character.abilityscores[4].score), 'Perception: '+this.calcModifier(character.abilityscores[4].score), 'Survival: '+this.calcModifier(character.abilityscores[4].score)]},
              {title: 'Cha-based Skills', data: ['Deception: '+this.calcModifier(character.abilityscores[5].score), 'Intimidation: '+this.calcModifier(character.abilityscores[5].score), 'Performance: '+this.calcModifier(character.abilityscores[5].score), 'Persuasion: '+this.calcModifier(character.abilityscores[5].score)]}
              ]}
            keyExtractor={(item, index) => item + index}
          />
          </ScrollView>
          {/* <ScrollView>
            <SectionList
              renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
              renderSectionHeader={({section: {title}}) => (
                <Text style={{fontWeight: 'bold'}}>{title}</Text>
              )}
              sections={[
                {title: 'Resistances', data: ['charmed']},
                {title: 'Immunities', data: ['sleep']}
              ]}
              keyExtractor={(item, index) => item + index}/>
          </ScrollView> */}
      </View>
      
        <View style={styles.scoresRow1}>
          <View style={shapes.CircleShapeView}>
            <Text>Proficiency Bonus</Text>
            <Text>2</Text>
          </View>
        </View>
    </View>
      
    );
  }
}

const stylesCont = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    height: '100%',
    width: '100%'
  },
});

// const mapStateToProps = state => {
//   const character =  state.characters.find(x => x.id === 0)
//   return {character: character};
//   // return {characters: state.characters};
// }

export default connect(null, actions)(withNavigation(SkillsScreen));
