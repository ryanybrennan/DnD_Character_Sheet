import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {Text, View, FlatList, TouchableHighlight, Modal, Button} from 'react-native';
import Axios from 'axios';
import { baseApi } from '../constants/urls';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { withNavigation } from 'react-navigation';
import RaceFeatureItem from '../components/RaceFeatures';
import RaceFeatureModal from '../components/RaceFeatureModal';

class RacialFeaturesScreen extends React.Component {
  _isMounted = false;
  constructor(props){
    super(props)
    this.state={
      // character: {},
      races: [],
      features: [],
      url: String,
      simpleFeatures: [],
      complexFeatures: [],
      modalVisible: false,
      simpleFeature: null,
      complexFeature: null
    }
  }
  static navigationOptions = {
    title: 'Racial Features',
  };

  componentDidMount(){
    // this.setState({character: this.props.navigation.getParam('character')});
    this._isMounted = true;
    Axios.get(baseApi+'races')
    .then(response => response.data)
    .then(responseJson => {
      if (this._isMounted){
        // console.log(responseJson.results);
        this.setState({
          races: responseJson.results,
        })
      }
    })
    .catch((error) => console.log(error))
    .then( () => this.getRaceFeatures());
  }

  componentDidUpdate(){

  }

  findRaceUrl(race){
    const charRace = race;
    const races = this.state.races;
    // console.log(charRace);
    for(let index in races){
      // console.log(races[index]);
      let race = races[index];
      if(race.name === charRace){
        // console.log(race.url);
        return race.url;
      }
    }
  }

  getRaceFeatures(){
    const url = this.findRaceUrl(this.props.character.race);
    if(url){
      Axios.get(url)
        .then(response => response.data)
        .then(responseJson => {
          if (this._isMounted){
            // console.log(responseJson);
            this.setState({
              features: Object.keys(responseJson).map(key => 
                ({feature: key, info: responseJson[key]}))
            })
          }
        })
        // .then(() => this.allocateFeatures())
        .catch(error => console.log(error));
    }
  }

//   allocateFeatures(){
//     let simpleFeatures = [];
//     let complexFeatures = [];
//     this.state.features.map((feature, index) => 
//     {
//         if(typeof feature.info === "string" || typeof feature.info === "number"){
//             if(feature.feature !== "_id" && feature.feature !== "index" && feature.feature !== "url"){
//                 simpleFeatures.push(feature);
//             }  
//         }else {
//             complexFeatures.push(feature);
//         }
//     })
//     this.setState({simpleFeatures: simpleFeatures});
//     this.setState({complexFeatures: complexFeatures});
//     // this.allocateComplexFeatures(this.state.complexFeatures);
// }

// displaySimpleFeatures = ({item}) => {
//   return <RaceFeatureItem feature={item.feature} info={item.info}/>
// }

// displayFeatures(){
//   console.log(this.state.simpleFeatures)
// }

  _onPress(item){
    this.setState({simpleFeature: null});
    this.setState({complexFeature: null});
    this.setModalVisible(true);
    // console.log(item.feature+": " +item.info);
    this.manageInfo(item);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  manageInfo(item){
    if(typeof item.info === "string" || typeof item.info === "number"){
      this.setState({simpleFeature: item})
    }else{
      this.setState({complexFeature: item})
    }
  }
displayName(){
  if(this.state.simpleFeature !== null){
    return <Text>{this.state.simpleFeature.feature}</Text>
  }else if (this.state.complexFeature !== null) {
    return <Text>{this.state.complexFeature.feature}</Text>
  }else{
    return <Text>No info</Text>
  }
}
displayInfo(){
  if(this.state.simpleFeature !== null){
    return <Text>{this.state.simpleFeature.info}</Text>
  }else if (this.state.complexFeature !== null){
    if(this.state.complexFeature.feature == "ability_bonuses"){
      // console.log(this.state.complexFeature.info);
      return this.mapAbilityBonuses(this.state.complexFeature.info)
    }else if(this.state.complexFeature.feature == "language_options"){
      return <Text>Nope nope nope</Text>
    } else if(this.state.complexFeature.info.length >0) {
      // console.log(this.state.complexFeature.info);
      return this.mapFeatures(this.state.complexFeature.info)
    }else{
      return <Text>No Info</Text>
    }
  }else{
    return <Text>No info</Text>
  }
}
mapFeatures(info){
  // console.log(info);
  return info.map((trait, index) =>
    <Text key={index}>{trait.name}</Text>)
}

mapAbilityBonuses(ability_bonuses) {
  let scoreBonus = [];
  for(let i in ability_bonuses){
      if(ability_bonuses[i] > 0 && i == 0){
        scoreBonus.push({"attribute": "Strength", "score": ability_bonuses[i]})
        // scoreBonus["attribute"] = "Strength";
        //   scoreBonus["score"] = ability_bonuses[i];
      }
      if(ability_bonuses[i] > 0 && i == 1){
        scoreBonus.push({"attribute": "Dexterity", "score": ability_bonuses[i]})
          // scoreBonus["attribute"] = "Dexterity";
          // scoreBonus["score"] = ability_bonuses[i];
      }
      if(ability_bonuses[i] > 0 && i == 2){
        scoreBonus.push({"attribute": "Constitution", "score": ability_bonuses[i]})
          // scoreBonus["attribute"] = "Constitution";
          // scoreBonus["score"] = ability_bonuses[i];
      }
      if(ability_bonuses[i] > 0 && i == 3){
        scoreBonus.push({"attribute": "Intelligence", "score": ability_bonuses[i]})
          // scoreBonus["attribute"] = "Intelligence";
          // scoreBonus["score"] = ability_bonuses[i];
      }
      if(ability_bonuses[i] > 0 && i == 4){
        scoreBonus.push({"attribute": "Wisdom", "score": ability_bonuses[i]})
          // scoreBonus["attribute"] = "Wisdom";
          // scoreBonus["score"] = ability_bonuses[i];
      }
      if(ability_bonuses[i] > 0 && i == 5){
        scoreBonus.push({"attribute": "Charisma", "score": ability_bonuses[i]})
          // scoreBonus["attribute"] = "Charisma";
          // scoreBonus["score"] = ability_bonuses[i];
      }
    }
    return scoreBonus.map((score, index) =>
    <Text key={index}>{score.attribute}: {score.score}</Text>)
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const character = this.props.character;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly', flexDirection: 'row'}}>
        <View>
          {/* {this.displayFeatures()} */}
          <Text>Racial Features</Text>
          <FlatList
            data={this.state.features}
            keyExtractor={(item, index) => item.feature+index}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: 'white'}}>
                  <Text id={item.feature+index}>{item.feature}</Text>
                  {/* <RaceFeatureModal name={item.feature} info={item.info} modalVisible={this.state.modalVisible} closeModal={()=> this.setState({modalVisible: false})}/> */}
                </View>
              </TouchableHighlight>
            )}/>
            <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                  }}>
                    <View style={{marginTop: 22}}>
                      <View>
                        {this.displayName()}
                        {this.displayInfo()}
                        <Button
                          title="Close"
                          onPress={() => 
                          this.setModalVisible(false)}>
                        </Button>
                      </View>
                    </View>
                  </Modal>
        </View>
        
        <View>
            <Text>Subrace Features</Text>
            <FlatList
            data={[{key:'Feature 1 Name', value:'Feature 1 Description'}, {key:'Feature 2 Name', value:'Feature 2 Description'}]}
            renderItem={({item}) => <Text>{item.key}</Text>}
              />
        </View>
        
      </View>
    )
  }
}
const mapStateToProps = (state, props) => {
  // console.log(state);
  const character =  state.characters.find(x => x.id === props.navigation.getParam('charId'))
  return {character: character};
  // return {characters: state.characters};
}

export default connect(mapStateToProps, actions)(withNavigation(RacialFeaturesScreen));
