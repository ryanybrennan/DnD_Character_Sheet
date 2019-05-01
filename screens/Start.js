import React from 'react';
import { Button, View, Text, FlatList} from 'react-native';
import styles from '../assets/styles/Button';
import listStyle from '../assets/styles/CharList';
// import { FlatList } from 'react-native-gesture-handler';
import CharListItem from '../components/CharListItem';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';

class StartScreen extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    renderCharList = ({item}) => {
       return <CharListItem id={item.id} name={item.name} race={item.race} class={item.class} level={item.level} navigation={this.props.navigation}/>
    }

    render() {
        return (
            <View style={listStyle.charList}> 
                <FlatList
                data={this.props.characters}
                renderItem={this.renderCharList}
                keyExtractor={(item) => item.id.toString()}
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

const mapStateToProps = state => {
    return {characters: state.characters}
}

export default connect(mapStateToProps)(withNavigation(StartScreen));