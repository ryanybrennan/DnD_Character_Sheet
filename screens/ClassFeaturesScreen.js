import React from 'react';
// import { ExpoConfigView } from '@expo/samples';
import {Text, View, FlatList, TouchableHighlight, Modal, Button} from 'react-native';
import Axios from 'axios';
import { baseApi } from '../constants/urls';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { withNavigation } from 'react-navigation';
import FeatureModal from '../components/RaceFeatureModal';

class ClassFeaturesScreen extends React.Component {
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
    title: 'Racial Features',
  };

  componentDidMount(){
    // this.setState({character: this.props.navigation.getParam('character')});
    this._isMounted = true;
    Axios.get(baseApi+'classes')
    .then(response => response.data)
    .then(responseJson => {
      if (this._isMounted){
        // console.log(responseJson.results);
        this.setState({
          classes: responseJson.results,
        })
      }
    })
    .catch((error) => console.log(error))
    .then( () => this.getClassFeatures())
    .then( () => this.getClassLevels());
  }

  findClassUrl(chClass){
    const charClass = chClass;
    const classes = this.state.classes;
    // console.log(charRace);
    for(let index in classes){
      // console.log(races[index]);
      let cl = classes[index];
      if(cl.name === charClass){
        // console.log(race.url);
        return cl.url;
      }
    }
  }

  getClassFeatures(){
    const url = this.findClassUrl(this.props.character.class);
    if(url){
      Axios.get(url)
        .then(response => response.data)
        .then(responseJson => {
          if (this._isMounted){
            // console.log(responseJson);
            this.setState({
              classFeatures: Object.keys(responseJson).map(key => 
                ({feature: key, info: responseJson[key]}))
            })
          }
        })
        // .then(() => this.allocateFeatures())
        .catch(error => console.log(error));
    }
  }

  getClassLevels(){
    const character = this.props.character;
    Axios.get(baseApi+"classes/"+character.class.toLowerCase()+"/level/"+character.level)
    .then(response => response.data)
    .then(responseJson => {
      if (this._isMounted){
        this.setState({
          levelFeatures: Object.keys(responseJson).map(key => 
            ({feature: key, info: responseJson[key]}))
        })
      }
    })
  }

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
      if(this.state.complexFeature.feature == "starting_equipment"){
        // console.log(this.state.complexFeature.info);
        return <Text>{this.state.complexFeature.info.url}</Text>
      }else if(this.state.complexFeature.feature == "proficiency_choices"){
        // console.log(this.state.complexFeature.info);
        return this.state.complexFeature.info[0].from.map((prof, index) => 
        <Text key={index}>{prof.name}</Text>)
      } 
      else if(this.state.complexFeature.feature =="spellcasting" && this.state.complexFeature.length !={}){
        // console.log(this.state.complexFeature.info);
        let spellslots = Object.keys(this.state.complexFeature.info).map(key => 
          ({feature: key, info: this.state.complexFeature.info[key]}))
        // console.log(spellslots);
        return this.slotSpells(spellslots);
      }else if(this.state.complexFeature.feature =="class_specific" && this.state.complexFeature.length != {}){
        let classSpecific = Object.keys(this.state.complexFeature.info).map(key => 
          ({feature: key, info: this.state.complexFeature.info[key]}))

          return this.slotSpells(classSpecific);
      }else if(this.state.complexFeature.info.length >0) {
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

  slotSpells(spellslots){
    return spellslots.map((slot, index)=>
      <Text key={index}>{slot.feature}</Text>
    )
  }

  render() {
    // console.log(this.state.classFeatures)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'space-evenly', flexDirection: 'row'}}>
        <View>
          <Text>Class Features</Text>
          <FlatList
            data={this.state.classFeatures}
            keyExtractor={(item, index) => item.feature+index}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: 'white'}}>
                  <Text id={item.feature+index}>{item.feature}</Text>
                  {/* <FeatureModal name={item.feature} info={item.info} modalVisible={this.state.modalVisible} closeModal={()=> this.setState({modalVisible: false})}/> */}
                </View>
              </TouchableHighlight>
            )}
            />
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
            <Text>Class Level Features</Text>
            <FlatList
            data={this.state.levelFeatures}
            keyExtractor={(item, index) => item.feature+index}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: 'white'}}>
                  <Text id={item.feature+index}>{item.feature}</Text>
                  {/* <FeatureModal name={item.feature} info={item.info} modalVisible={this.state.modalVisible} closeModal={()=> this.setState({modalVisible: false})}/> */}
                </View>
              </TouchableHighlight>
            )}
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

export default connect(mapStateToProps, actions)(withNavigation(ClassFeaturesScreen));