import React from 'react';
import { Text } from 'react-native';
import { withNavigation } from 'react-navigation';
// import { withRouter } from 'react-router-native';

import styles from '../assets/styles/CharList';
import Card from './RaceCard';

const RaceFeatureItem = (props) => {
    return (
        <Card style={styles.charListItem}>
            <Text>Feature: {props.feature}</Text>
            <Text>Info: {props.info}</Text>
        </Card>
    )

}

export default withNavigation(RaceFeatureItem);