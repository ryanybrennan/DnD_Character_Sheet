import React from 'react';
import { ScrollView, StyleSheet, Text, FlatList, TouchableHighlight, View, Modal, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { withNavigation } from 'react-navigation';
import Axios from 'axios';

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

    _onPress(item){
      this.setState({simpleFeature: null});
      this.setState({complexFeature: null});
      this.setModalVisible(true);
      // console.log(item.feature+": " +item.info);
      this.getSpellInfo(item.url);
      // this.manageInfo(item);
    }

    getSpellInfo(url){
      this._isMounted = true;
      Axios.get(url)
      .then(response => response.data)
      .then(responseJson => {
        if (this._isMounted){
          this.setState({
            spellInfo: Object.keys(responseJson).map(key => 
            ({feature: key, info: responseJson[key]}))
          })
       }
      })
      .catch((error)=> console.log(error))
      .then(() => this.manageInfo(this.state.spellInfo))
    }
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  
    manageInfo(item){
      // console.log(item);
      let simpleFeatures = []
      let complexFeatures = []
      for(x in item){
        if(typeof item[x].info === "string" || typeof item[x].info === "number"){
          // console.log(item[x])
          simpleFeatures.push(item[x]);
        }else{
          // console.log(item[x])
          complexFeatures.push(item[x]);
        }
      }
      this.setState({simpleFeatures: simpleFeatures});
      this.setState({complexFeatures: complexFeatures});
    }

    displaySimpleFeatures(){
      // console.log(this.state.simpleFeatures)
      return this.state.simpleFeatures.map((thing, index)=>
      <Text key={index}>{thing.feature}: {thing.info} </Text>
      )
    }

    displayComplexFeatures(){
      // console.log(this.state.complexFeatures)
      // for(let ger in this.state.complexFeatures){
      //   console.log(ger)
      //   this.sortInfo(this.state.complexFeatures[ger]);
      // }
      return this.state.complexFeatures.map((thing, index)=>
          <View key={index}>{this.sortInfo(thing)}</View>
      )
    }

    sortInfo(thing){
      // console.log(thing);
      if(thing.feature == "desc" || thing.feature =="higher_level" || thing.feature =="components") {
        return thing.info.map((item, index)=>
        <Text key={index}>{thing.feature}: {item}</Text>)
      }else if(thing.feature == "school"){
        return <Text>{thing.feature}: {thing.info.name}</Text>
      }else{
        return thing.info.map((item, index)=>
        <Text key={index}>{thing.feature}: {item.name}</Text>)
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
      }else if(this.state.complexFeature.info.length >0) {
          // console.log(this.state.complexFeature.info);
          return this.mapFeatures(this.state.complexFeature.info)
      }else{
          return <Text>No Info</Text>
      }
    }

    mapFeatures(info){
      // console.log(info);
      return info.map((trait, index) =>
        <Text key={index}>{trait.name}</Text>)
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
          {/* {this.props.spellList.spells ? 
          this.displaySpells() : null} */}
          <FlatList
            data={this.props.spellList.spells}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index, separators}) => (
              <TouchableHighlight
                onPress={() => this._onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <View style={{backgroundColor: 'white'}}>
                  <Text id={index}>{item.name}</Text>
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
                      <ScrollView>
                        {this.displaySimpleFeatures()}
                        {this.displayComplexFeatures()}

                        {/* {this.displayName()}
                        {this.displayInfo()} */}
                        <Button
                          title="Close"
                          onPress={() => 
                          this.setModalVisible(false)}>
                        </Button>
                      </ScrollView>
                    </View>
                  </Modal>
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