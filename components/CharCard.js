import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/CharList';
import { withNavigation } from 'react-navigation';

const CharCard = (props) => {
    return (
        <TouchableOpacity style={styles.cardStyle}
        onPress={() => props.navigation.navigate('Main')}>
            {props.children}
        </TouchableOpacity>
    );
};

export default withNavigation(CharCard);