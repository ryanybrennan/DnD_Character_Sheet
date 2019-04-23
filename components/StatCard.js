import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../assets/styles/CharSheet';
import shapes from '../assets/styles/Shapes';
import { withNavigation } from 'react-navigation';

const StatCard = (props) => {
    return (
        <View style={styles.statBlock}>
              <View style={shapes.CircleShapeView}>
                <Text>{props.name}</Text>
                <Text>{props.score}</Text>
              </View>
            <View style={styles.scoresRow1}>
                <View style={shapes.SquareShapeView}>
                  <Text>Mod</Text>
                  <Text>{props.modifier}</Text>
                </View>
                <View style={shapes.SquareShapeView}>
                  <Text>Save</Text>
                  <Text>{props.savingThrow}</Text>
                </View>
            </View>
        </View>
    )
}

export default withNavigation(StatCard);