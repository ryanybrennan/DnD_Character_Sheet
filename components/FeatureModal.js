import React from 'react';
import {Text, View, FlatList, TouchableHighlight, Modal, Button} from 'react-native';

class FeatureModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: props.modalVisible,
            simpleFeature: null,
            complexFeature: [],
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
    manageInfo(info){
        if(typeof info === "string" || typeof info === "number"){
            this.setState({simpleFeature: info})
        }else{
            this.setState({complexFeature: info})
        }
        
    }
    displayInfo(){
      if(this.state.simpleFeature !== null){
        return (<Text>{this.state.simpleFeature}</Text>)
      }else{
        if(this.props.name == "ability_bonuses"){
          this.mapAbilityBonuses(this.state.complexFeature)
        }else{
          this.state.complexFeature.map((feature, index)=> {
          return <Text>{feature}</Text>
          })
        }
      }
    }

    mapAbilityBonuses(abilities) {
      let scoreBonus = {};
      const ability_bonuses = this.state.complexFeature;
      for(let i in abilities){
          if(ability_bonuses[i] > 0 && i == 0){
            scoreBonus["attribute"] = "Strength"
              scoreBonus["score"] = ability_bonuses[i];
          }
          if(ability_bonuses[i] > 0 && i == 1){
              scoreBonus["attribute"] = "Dexterity"
              scoreBonus["score"] = ability_bonuses[i];
          }
          if(ability_bonuses[i] > 0 && i == 2){
              scoreBonus["attribute"] = "Constitution"
              scoreBonus["score"] = ability_bonuses[i];
          }
          if(ability_bonuses[i] > 0 && i == 3){
              scoreBonus["attribute"] = "Intelligence"
              scoreBonus["score"] = ability_bonuses[i];
          }
          if(ability_bonuses[i] > 0 && i == 4){
              scoreBonus["attribute"] = "Wisdom"
              scoreBonus["score"] = ability_bonuses[i];
          }
          if(ability_bonuses[i] > 0 && i == 5){
              scoreBonus["attribute"] = "Charisma"
              scoreBonus["score"] = ability_bonuses[i];
          }
        }
        return <Text>{scoreBonus.attribute}: {scoreBonus.score}</Text>
      }
    

    render(){
        return(
            <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.props.modalVisible}>
          <View style={{marginTop: 22}}>
            <View>
                <Text>{this.props.name}</Text>
              {this.displayInfo()}
              <Button
                title="Close"
                onPress={() => this.props.closeModal()}>
                {/* <Text>Hide Modal</Text> */}
              </Button>
            </View>
          </View>
        </Modal>
        )
    }
}

export default FeatureModal;