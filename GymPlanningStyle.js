import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const TitleBarStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        marginTop: StatusBar.currentHeight,
        borderBottomWidth: 5
    },
    pressable: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.medium,
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.dark
    },
    pressablePressed: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark,
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.dark
    },
    text: {
        fontSize: 20,
        color: Colors.dark
    },
    arrowSVGView: {
        width: 50
    },
    settingsSVGView: {
        width: 60
    },
    image: {
        height: 60,
        width: 250,
        resizeMode: 'contain'
    }
});