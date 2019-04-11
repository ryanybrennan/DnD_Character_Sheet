import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/CharList';
import { withNavigation } from 'react-navigation';

const RaceCard = (props) => {
    return (
        <TouchableOpacity>
            {props.children}
        </TouchableOpacity>
    );
};

export default withNavigation(RaceCard);