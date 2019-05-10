import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { selectChar } from '../actions/index';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-native';

import styles from '../assets/styles/CharList';
import Card from './CharCard';

class CharListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    onCharSelect(id) {
        // this.props.selectChar(id);
        // console.log(id);
        this.props.navigation.navigate('Main', {
            charId: id,
            character: this.props.selectChar(id).payload
        })
    }
    render(){
        return (
            <TouchableOpacity style={styles.charListItem}
            // onPress={() => this.props.navigation.navigate('Main', {charId: this.props.id})}
            onPress={()=> this.onCharSelect(this.props.id)}
            >
                <Text>{this.props.name}, Level: {this.props.level}</Text>
                <Text>{this.props.race} {this.props.class}</Text> 
            </TouchableOpacity>
        )
    }

}

// const mapStateToProps = (state, ownProps) => {

//     const selected = state.characters.id === ownProps.id
//     return {selected}
// }

export default connect(null, {selectChar})(withNavigation(CharListItem));