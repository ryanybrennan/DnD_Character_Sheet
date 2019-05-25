import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { withNavigation } from 'react-navigation';

class SpellsScreen extends React.Component {
  _isMounted = false;
  constructor(props){
    super(props)
    this.state={
      // character: {},
      classes: [],
      classFeatures: [],
      levelFeaures: [],
      url: String,
      simpleFeatures: [],
      complexFeatures: [],
      modalVisible: false,
      simpleFeature: null,
      complexFeature: null,

    }
  }

    static navigationOptions = {
      title: 'Spells',
    };

    componentDidMount(){
      this.props.fetchSpells();
      // console.log(this.props.spellList.length);
    }
    displaySpells(){
      return this.props.spellList.spells.map((spell, index)=>
      <Text key={index}>{spell.name}</Text>
      )
    }
  
    render() {
      // console.log(this.props.spellList.spells);
      return (
        <ScrollView style={styles.container}>
          <Text>Spells List</Text>
          {this.props.spellList.spells ? 
          this.displaySpells() : null}
        </ScrollView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    },
  });

  const mapStateToProps = (state, props) => {
    const character =  state.characters.find(x => x.id === props.navigation.getParam('charId'))
  return {character: character, spellList: state.spells};
  }

  export default connect(mapStateToProps, actions)(withNavigation(SpellsScreen));