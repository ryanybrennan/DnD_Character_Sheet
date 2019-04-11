import React from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { withRouter } from 'react-router-native';

import styles from '../assets/styles/CharList';
import Card from './CharCard';

const CharListItem = (props) => {
    return (
        <Card style={styles.charListItem}>
            <Text>{props.name}, Level: {props.level}</Text>
            <Text>{props.race} {props.class}</Text> 
        </Card>
    )

}

export default withNavigation(CharListItem);