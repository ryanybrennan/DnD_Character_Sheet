import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    charList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:30,
        width: '100%',
        height: '80%'
     },
     charListItem: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'silver',
        width: '100%',
        height: '100%'
     },
     cardStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        backgroundColor: 'silver'
    },
})