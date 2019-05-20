import React from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import RaceFeatureItem from '../components/RaceFeatures';

class Race extends React.PureComponent {

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            races: [],
            topRace: String,
            topSubRace: String,
            features: [],
            speed: String,
            ability_bonuses: [],
            alignment: String,
            age: String,
            size: String,
            size_description: String,
            starting_proficiencies: [],
            languages: [],
            language_desc: String,
            traits: [],
            subraces: [],
            simpleFeatures: [],
            complexFeatures: [],
            scoreBonus: []

        }
    }

    componentDidMount(){
        this._isMounted = true;
        axios.get("http://dnd5eapi.co/api/races")
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
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    setRace() {
        return this.state.races.map((race, index) => 
        <Picker.Item key={index} label={race.name} value={race.name}/>
        )
    }

    setSubRace() {
        return this.state.subraces.map((subrace, index) =>
        <Picker.Item key={index} label={subrace.name} value={subrace.name}/>
        )
    }

    getFeatures(item){
        this.state.races.forEach(race => {
            if(race.name == item){
                axios.get(race.url)
                .then(response => response.data)
                .then(responseJson =>
                    this.setState({features: Object.keys(responseJson).map(key => 
                        ({feature: key, info: responseJson[key]}))}))
                .then(() => this.allocateFeatures())
                .then(() => this.mapAbilityBonuses())
                .catch(error => console.log(error));
            }
        });
    }

    allocateFeatures(){
        let simpleFeatures = [];
        let complexFeatures = [];
        this.state.features.map((feature, index) => 
        {
            
            if(typeof feature.info === "string" || typeof feature.info === "number"){
                if(feature.feature !== "_id" && feature.feature !== "index" && feature.feature !== "url"){
                    simpleFeatures.push(feature);
                }  
            }else {
                complexFeatures.push(feature);
            }
        })
        this.setState({simpleFeatures: simpleFeatures});
        this.setState({complexFeatures: complexFeatures});
        this.allocateComplexFeatures(this.state.complexFeatures);
    }
    mapAbilityBonuses() {
        let scoreBonus = {};
        const ability_bonuses = this.state.ability_bonuses;
        for(let i in ability_bonuses){
            if(ability_bonuses[i] > 0 && i == 0){
                scoreBonus["Strength"] = ability_bonuses[i];
            }
            if(ability_bonuses[i] > 0 && i == 1){
                scoreBonus["Dexterity"] = ability_bonuses[i];
            }
            if(ability_bonuses[i] > 0 && i == 2){
                scoreBonus["Constitution"] = ability_bonuses[i];
            }
            if(ability_bonuses[i] > 0 && i == 3){
                scoreBonus["Intelligence"] = ability_bonuses[i];
            }
            if(ability_bonuses[i] > 0 && i == 4){
                scoreBonus["Wisdom"] = ability_bonuses[i];
            }
            if(ability_bonuses[i] > 0 && i == 5){
                scoreBonus["Charisma"] = ability_bonuses[i];
            }
        }
        this.setState({scoreBonus: Object.keys(scoreBonus).map(key => 
            ({feature: key, info: scoreBonus[key]}))});
    }
    displayAbilityBonuses(){
        return this.state.scoreBonus.map((score, index) => 
            <RaceFeatureItem key={index} feature={score.feature} info={score.info}/>
        )
    }
    displaySimpleFeatures() {
        return this.state.simpleFeatures.map((feature, index) =>
        <RaceFeatureItem key={index} feature={feature.feature} info={feature.info}/>
    )}
    displayLanguages(){
        return this.state.languages.map((language, index) =>
        <Text key={index}>Language: {language.name}</Text>)
    }
    // displayComplexFeatures(){
    //     this.state.complexFeatures.map((feature, index) =>
    //     console.log('complex feature', feature)
    //     ) 
    // }
    displayStartingProficiencies(){
        return this.state.starting_proficiencies.map((sprof, index)=>
        <Text key={index}>Starting Proficiencies: {sprof.name}</Text>
        )
    }
    displayTraits(){
        return this.state.traits.map((trait, index)=>
        <Text key={index}>Traits: {trait.name}</Text>
        )
    }
    displaySubRaces(){
        return this.state.subraces.map((subrace, index)=>
        <Text key={index}>Subrace: {subrace.name}</Text>
        )
    }

    allocateComplexFeatures(features){
        for(let i in features){
            // if(features[i].feature == "speed"){
            //     this.setState({speed: features[i].info})
            // }
            if(features[i].feature == "ability_bonuses"){
                this.setState({ability_bonuses: features[i].info})
            }
            // if(features[i].feature == "alignment"){
            //     this.setState({alignment: features[i].info})
            // }
            // if(features[i].feature == "age"){
            //     this.setState({age: features[i].info})
            // }
            // if(features[i].feature == "size"){
            //     this.setState({size: features[i].info})
            // }
            // if(features[i].feature == "size_description"){
            //     this.setState({size_description: features[i].info})
            // }
            if(features[i].feature == "starting_proficiencies"){
                this.setState({starting_proficiencies: features[i].info})
            }
            if(features[i].feature == "languages"){
                this.setState({languages: features[i].info})
            }
            // if(features[i].feature == "language_desc"){
            //     this.setState({language_desc: features[i].info})
            // }
            if(features[i].feature == "traits"){
                this.setState({traits: features[i].info})
            }
            if(features[i].feature == "subraces"){
                this.setState({subraces: features[i].info})
            }
        }
    }

    render() {
        return (
            <View style={styles.racePicker}>
                <Text>Pick a Race</Text>
                <Picker
                selectedValue={this.state.topSubRace}
                style={{flex: 1, height: 150, width: 200}}
                onValueChange={(itemValue) => {
                    if(itemValue !== 0){
                        this.setState({topSubRace: itemValue},
                        this.getFeatures(itemValue))
                    }
                  }}>
                  <Picker.Item key="-1" label="--" value="0"/>
                  {this.setRace()}
                </Picker>
                <ScrollView style={{flex:1}}>
                {this.displayAbilityBonuses()}
                {this.displaySimpleFeatures()}
                {/* {this.displayComplexFeatures()} */}
                {this.displayLanguages()}
                {this.displayStartingProficiencies()}
                {this.displayTraits()}
                {this.displaySubRaces()}
                  {/* <Text>Speed: {this.state.speed}</Text>
                  <Text>Size: {this.state.size}</Text>
                  <Text>{this.state.size_description}</Text>
                  <Text>Ability Bonuses: {this.state.ability_bonuses}</Text>
                  <Text>Alignment: {this.state.alignment}</Text>
                  <Text>Age: {this.state.age}</Text>
                  <Text>Starting Proficiencies {this.state.starting_proficiencies}</Text>
                  <Text>Languages: {this.state.languages}</Text>
                  <Text>{this.state.language_desc}</Text>
                  <Text>Traits: {this.state.traits}</Text>
                  <Text>Subrace: {this.state.subraces}</Text> */}
                </ScrollView>
                <Text>Pick a Subrace</Text>
                <Picker
                selectedValue={this.state.topSubRace}
                style={{flex: 1, height: 150, width: 200}}
                onValueChange={(itemValue) => {
                    if(itemValue !== 0){
                        this.setState({topSubRace: itemValue},
                        // this.getFeatures(itemValue)
                        )
                    }
                  }}>
                  <Picker.Item key="-1" label="--" value="0"/>
                  {this.setSubRace()}
                </Picker>
                <Button
                title="Go back"
                onPress={() => this.props.navigation.navigate('Start')}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    racePicker: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 30,
        // height: '100%',
        // width: '100%'
    }
})

export default Race;