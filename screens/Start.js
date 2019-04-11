import React from 'react';
import { Button, View, Text, FlatList} from 'react-native';
import styles from '../assets/styles/Button';
import listStyle from '../assets/styles/CharList';
// import { FlatList } from 'react-native-gesture-handler';
import CharListItem from '../components/CharListItem';
import { withNavigation } from 'react-navigation';

class StartScreen extends React.PureComponent{
    constructor(props) {
        super(props);
      }

    renderCharList = ({item}) => {
       return <CharListItem key={item.key} name={item.name} race={item.race} class={item.class} level={item.level} navigation={this.props.navigation}/>
    }

    render() {
        return (
            <View style={listStyle.charList}> 
                <FlatList
                data={[{key: '1', name: 'Character 1', race: 'Human', class: 'paladin', level: 3}, 
                {key: '2', name: 'Character 2', race: 'half-elf', class: 'rogue', level: 3}]}
                renderItem={this.renderCharList}
                />
                <View style={styles.button}>
                    <Button
                    title="Create a Character"
                    onPress={() => this.props.navigation.navigate('PickRace')}/>
                </View>
            </View>
        )
    }
}

export default withNavigation(StartScreen);