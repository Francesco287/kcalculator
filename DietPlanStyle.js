import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const RemainingCaloriesStyles = StyleSheet.create({
    remCalView: {
        backgroundColor: Colors.medium,
        marginTop: 5,
        borderRadius: 10
    },
    remCalProtCarbFatView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    carbFatRemProtRemTitle: {
        fontSize: 20,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    carbFatRemProtRem: {
        fontSize: 20
    },
    applyTextInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: Colors.light,
        width: 70,
        height: 40,
        paddingLeft: 10,
        paddingRight: 5,
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        fontSize: 15
    },
    pressable: {
        justifyContent: 'center',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.dark
    },
    pressableText: {
        fontSize: 15,
        color: Colors.light
    }
});

export const MealStyles = StyleSheet.create({
    view: {
        padding: 10
    },
    titleView: {
        padding: 2,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: Colors.mediumDark
    },
    mealName: {
        textAlign: 'left',
        fontSize: 25,
        padding: 5,
        flex: 1
    }
});

export const TitleBarStyles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        marginTop: StatusBar.currentHeight,
        borderBottomWidth: 5
    },
    pressable: {
        width: 150,
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
        width: 150,
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

export const MealListStyles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: Colors.lightMedium
    },
    flatList: {
        flex: 1
    }
});

export const DietPlanStyles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column-reverse'
    }
});