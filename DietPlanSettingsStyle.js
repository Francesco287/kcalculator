import { Dimensions, StatusBar, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const TitleBarStyles = StyleSheet.create({
    view: {
        height: 70,
        borderBottomWidth: 5,
        marginTop: StatusBar.currentHeight,
        alignItems: 'center',
        flexDirection: 'row'
    },
    pressable: {
        transform: [
            {translateX: 10}
        ]
    },
    arrowImage: {
        resizeMode: 'contain',
        width: 40
    },
    text: {
        width: 200,
        transform: [
            {translateX: Dimensions.get('screen').width / 2 - 140}
        ],
        fontSize: 40,
        textAlign: 'center'
    }
});

export const AddMealStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: Colors.lightMedium
    },
    textInput: {
        borderWidth: 4,
        borderRadius: 10,
        height: 70,
        width: 250,
        fontSize: 30,
        padding: 10,
        backgroundColor: Colors.light
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 80,
        borderRadius: 10,
        marginLeft: 30,
        backgroundColor: Colors.medium,
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.black
    },
    pressablePressed: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 80,
        borderRadius: 10,
        marginLeft: 30,
        backgroundColor: Colors.dark,
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.black
    },
    pressableText: {
        fontSize: 30,
        color: Colors.black
    }
});

export const Reset = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        backgroundColor: Colors.lightMedium
    },
    pressable: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 350,
        borderRadius: 10,
        backgroundColor: `#ff2828`,
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.black
    },
    pressablePressed: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 350,
        borderRadius: 10,
        backgroundColor: '#7c0000',
        elevation: 5,
        borderWidth: 3,
        borderColor: Colors.black
    },
    pressableText: {
        fontSize: 25,
        color: Colors.black
    }
});

export const DietPlanSettingsStyles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: Colors.lightMedium
    }
});