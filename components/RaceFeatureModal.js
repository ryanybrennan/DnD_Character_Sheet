import React from 'react';
import {Text, View, FlatList, TouchableHighlight, Modal, Button} from 'react-native';

class RaceFeatureModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: props.modalVisible,
            simpleFeature: null,
            complexFeature: null,
        }
    }
    componentDidMount(){
      this.manageInfo(this.props.info)
    }
    // getDerivedStateFromProps(nextProps){

    // }

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
      displayName(){
        if(this.state.simpleFeature !== null){
          return <Text>{this.state.simpleFeature.feature}</Text>
        }else if (this.state.complexFeature !== null) {
          return <Text>{this.state.complexFeature.feature}</Text>
        }else{
          return <Text>No info</Text>
        }
      }
    

    render(){
        return(
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
                {/* <Text>Hide Modal</Text> */}
              </Button>
            </View>
          </View>
        </Modal>
        )
    }
}

export default RaceFeatureModal;