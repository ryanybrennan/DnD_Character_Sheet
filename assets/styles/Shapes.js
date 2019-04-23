import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    CircleShapeView: {
        //To make Circle Shape
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: '#FF00FF',
        alignItems: 'center',
        justifyContent: 'center'
     },
    TriangleShapeView: {
        //To make Triangle Shape
        flex: 1,
        width: 0,
        height: 0,
        borderLeftWidth: 30,
        borderRightWidth: 30,
        borderBottomWidth: 60,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'yellow',
    },
    SquareShapeView: {
        //To make Square Shape
        flex:1,
        width: 40,
        height: 40,
        backgroundColor: '#14ff5f',
        alignItems: 'center',
        justifyContent: 'center',
     },
})