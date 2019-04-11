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
            subraces: []
        }
    }

    componentWillMount(){
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

    getFeatures(item){
        this.state.races.forEach(race => {
            if(race.name == item){
                // console.log(race.url);
                axios.get(race.url)
                .then(response => response.data)
                .then(responseJson =>
                    this.setState({features: Object.keys(responseJson).map(key => 
                        ({feature: key, info: responseJson[key]}))}))
                .catch(error => console.log(error));
                // this.allocateFeatures(this.state.features);
            }
        });
    }

    displayFeatures(){
        return this.state.features.map((feature, index) => 
        // console.log(feature.feature, feature.info),
        <RaceFeatureItem key={index} feature={feature.feature} />
        // console.log(typeof feature.info)
        // console.log(feature)
        // <Text>{feature.feature}: {feature.info}</Text>
        )
       
    }

    allocateFeatures(features){
        for(let i in features){
            if(features[i].feature == "speed"){
                this.setState({speed: features[i].info})
            }
            if(features[i].feature == "ability_bonuses"){
                this.setState({ability_bonuses: features[i].info})
            }
            if(features[i].feature == "alignment"){
                this.setState({alignment: features[i].info})
            }
            if(features[i].feature == "age"){
                this.setState({age: features[i].info})
            }
            if(features[i].feature == "size"){
                this.setState({size: features[i].info})
            }
            if(features[i].feature == "size_description"){
                this.setState({size_description: features[i].info})
            }
            if(features[i].feature == "starting_proficiencies"){
                this.setState({starting_proficiencies: features[i].info})
            }
            if(features[i].feature == "languages"){
                this.setState({languages: features[i].info})
            }
            if(features[i].feature == "language_desc"){
                this.setState({language_desc: features[i].info})
            }
            if(features[i].feature == "traits"){
                this.setState({traits: features[i].info})
            }
            if(features[i].feature == "subraces"){
                this.setState({subraces: features[i].info})
            }
        }
        // return this.state.map((key, index) =>
        //     <RaceFeatureItem key={index} feature={this.state.key} />
        // )
    }

    render() {
        return (
            <View style={styles.racePicker}>
                <Text>Pick a Race</Text>
                <Picker
                selectedValue={this.state.topRace}
                style={{flex: 1, height: 150, width: 200}}
                onValueChange={(itemValue) => {
                    if(itemValue !== 0){
                        this.setState({topRace: itemValue},
                        this.getFeatures(itemValue))
                    }
                  }}>
                  <Picker.Item key="-1" label="--" value="0"/>
                  {this.setRace()}
                </Picker>
                <ScrollView style={{flex:1}}>
                {this.displayFeatures()}
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