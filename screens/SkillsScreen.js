import React from 'react';
import { ScrollView, StyleSheet, View, Text, SectionList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../assets/styles/CharSheet';
import shapes from '../assets/styles/Shapes';

export default class SkillsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      prof: Boolean
    })
  }
  static navigationOptions = {
    title: 'Skills',
  };

  render() {
    return (
    <View style={stylesCont.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly', flexDirection: 'row'}}>
        <ScrollView>
            <SectionList
              renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
              renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
              )}
              sections={[
              {title: 'Str-based Skills', data: ['Athletics: '+3]},
              {title: 'Dex-based Skills', data: ['Acrobatics: '+-1, 'Sleight of Hand: '+-1, 'Stealth: '+-1]},
              {title: 'Int-based Skills', data: ['Arcana: '+0, 'History: '+0, 'Investigation: '+0, 'Nature: '+0, 'Religion: '+0]},
              {title: 'Wis-based Skills', data: ['Animal Handling: '+2, 'Insight: '+2, 'Medicine: '+2, 'Perception: '+2, 'Survival: '+2]},
              {title: 'Cha-based Skills', data: ['Deception: '+3, 'Intimidation: '+3, 'Performance: '+3, 'Persuasion: '+3]}
              ]}
            keyExtractor={(item, index) => item + index}
          />
          </ScrollView>
          <ScrollView>
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
          </ScrollView>
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
  },
});
