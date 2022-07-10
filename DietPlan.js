import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { SvgXml } from 'react-native-svg';
import Dialog from "react-native-dialog";
import * as Style from "./DietPlanStyle";

//REMAINING CALORIES OF A SINGLE MEAL
function RemainingCalories(props)
{
    //THE STATE IS FOR THE TEXTINPUTS
    const [textInputCarbFat, setTextInputCarbFat] = useState('');
    const [textInputProt, setTextInputProt] = useState('');

    //STYLE
    const styles = Style.RemainingCaloriesStyles;

    //CALLBACK WHEN THE APPLY BUTTON IS PRESSED, IT ALTERS THE CALORIES REMAINING FROM CARB/FAT
    function handleCarbFatAlter()
    {
        if(isNaN(textInputCarbFat) || Math.abs(parseInt(textInputCarbFat)) >= 100000 ||
        textInputCarbFat == "")
            return;

        let data = {...props.data};
        data[props.mealName].carbFatRem -= parseInt(textInputCarbFat);

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

            setTextInputCarbFat('');
            props.changeData(data);
        });
    }

    //CALLBACK WHEN THE APPLY BUTTON IS PRESSED, IT ALTER THE CALORIES REMAINING FROM PROTEINS
    function handleProtAlter()
    {
        if(isNaN(textInputProt) || Math.abs(parseInt(textInputProt)) >= 100000 ||
        textInputProt == "")
            return;

        let data = {...props.data};
        data[props.mealName].protRem -= parseInt(textInputProt);

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

            setTextInputProt('');
            props.changeData(data);
        });
    }

    return (
        <View style={styles.remCalView}>
            <Text style={styles.carbFatRemProtRemTitle}>Remaining calories from:</Text>
            {/* REMAINING CALORIES FROM CARB/FAT AND TEXTINPUT TO MODIFY THEM */}
            <View style={styles.remCalProtCarbFatView}>
                <Text style={styles.carbFatRemProtRem}>Carb/fat: {props.carbFatRem}</Text>
                <View style={styles.applyTextInput}>
                    <TextInput value={textInputCarbFat} onChangeText={(value) => {setTextInputCarbFat(value)}} keyboardType='numeric' style={styles.textInput} />
                    <Pressable onPress={() => {handleCarbFatAlter()}} style={styles.pressable}>
                        <Text style={styles.pressableText}>Apply</Text>
                    </Pressable>
                </View>
            </View>
            {/* REMAINING CALORIES FROM PROTEINS AND TEXTINPUT TO MODIFY THEM */}
            <View style={styles.remCalProtCarbFatView}>
                <Text style={styles.carbFatRemProtRem}>Proteins: {props.protRem}</Text>
                <View style={styles.applyTextInput}>
                    <TextInput value={textInputProt} onChangeText={(value) => {setTextInputProt(value)}} keyboardType='numeric' style={styles.textInput} />
                    <Pressable onPress={() => {handleProtAlter()}} style={styles.pressable}>
                        <Text style={styles.pressableText}>Apply</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

//SINGLE MEAL
function Meal(props)
{
    //THE STATE IS FOR THE DIALOG
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogInputProteins, setDialogInputProteins] = useState('');
    const [dialogInputCarbFat, setDialogInputCarbFat] = useState('');

    //ICONS
    const settingsSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32" style=" fill:#000000;"><path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z"></path></svg>`;
    const trashSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#fa314a;"><path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path></svg>`;

    //STYLE
    const styles = Style.MealStyles;

    //CALLBACK WHEN THE DIALOG'S APPLY BUTTON IS PRESSED, IT ALTERS THE DEFAULT KCAL OF THE MEAL
    function handleApply()
    {
        if (isNaN(parseInt(dialogInputCarbFat)) || isNaN(parseInt(dialogInputProteins)) ||
        Math.abs(parseInt(dialogInputProteins)) >= 100000 || Math.abs(parseInt(dialogInputCarbFat)) >= 100000)
            return;

        let data = {...props.data};

        data[props.mealName].carbFat = Math.abs(parseInt(dialogInputCarbFat));
        data[props.mealName].prot = Math.abs(parseInt(dialogInputProteins));

        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

            setDialogVisible(false);
        });
    }

    //CALLBACK WHEN THE TRASH ICON IS PRESSED, IT DELETES THE MEAL
    function handleTrashSVGPress()
    {
        let data = {...props.data};
        delete data[props.mealName];
        
        FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

            props.changeData(data);
        });
    }

    //CALLBACK WHEN THE SETTINGS ICON IS PRESSED, SET THE DIALOG INPUTS WITH THE VALUES FROM THE DATA FILE
    function handleSettingSVGPress()
    {
        const data = {...props.data};
            
        setDialogInputCarbFat(data[props.mealName].carbFat.toString());
        setDialogInputProteins(data[props.mealName].prot.toString());
        setDialogVisible(true);
    }

    return (
        <View style={styles.view}>
            {/* TITLE OF THE MEAL WITH THE ICONS */}
            <View style={styles.titleView}>
                <Text style={styles.mealName}>{props.mealName}</Text>
                {/* WHEN THE SETTINGS ICON IS PRESSED, THE DIALOG SHOWS UP */}
                <SvgXml onPress={() => { handleSettingSVGPress() }} xml={settingsSVG} width="13%" height="100%" />
                <SvgXml onPress={() => { handleTrashSVGPress() }} xml={trashSVG} width="13%" height="100%" />
            </View>
            {/* REMAINING CALORIES */}
            <RemainingCalories data={props.data} changeData={props.changeData} mealName={props.mealName} carbFatRem={props.carbFatRem} protRem={props.protRem} />
            {/* DIALOG TO ALTER THE DEFALUT CALORIES */}
            <Dialog.Container visible={dialogVisible} onBackdropPress={() => {setDialogVisible(false)}} useNativeDriver={true}>
                <Dialog.Title>Set default calories</Dialog.Title>
                <Dialog.Input onChangeText={(value) => { setDialogInputCarbFat(value) }} placeholder='Calories from carb/fat' keyboardType='numeric' value={dialogInputCarbFat} />
                <Dialog.Input onChangeText={(value) => { setDialogInputProteins(value) }} placeholder='Calories from proteins' keyboardType='numeric' value={dialogInputProteins} />
                <Dialog.Button onPress={() => { setDialogVisible(false) }} label="Cancel" />
                <Dialog.Button onPress={() => { handleApply() }} label="Apply" />
            </Dialog.Container>
        </View>
    );
}

function TitleBar(props)
{
    //THIS STATE IS USED TO CHECK IF THE RESET KCAL BUTTON IS DISPLAYED ON THE SCREEN
    const [resetKcalPressableOnScreen, setResetKcalPressableOnScreen] = useState(false);

    //THESE HOOKS ARE USED FOR THE ANIMATION
    const pressableTranslateX = useRef(
        new Animated.Value(-200)
    ).current;
    const arrowSVGTranslateX = useRef(
        new Animated.Value(-200)
    ).current;
    const arrowSVGRotationZ = useRef(
        new Animated.Value(-90)
    ).current;
    const imageTranslateX = useRef(
        new Animated.Value(Dimensions.get('screen').width / 2 - 375)
    ).current;
    const settingsSVGTranslateX = useRef(
        new Animated.Value(Dimensions.get('screen').width - 570)
    ).current;

    //STYLE
    const styles = Style.TitleBarStyles;
    const animateStyle = StyleSheet.create({
        pressable: {
            transform: [
                {translateX: pressableTranslateX}
            ]
        },
        arrowSVG: {
            transform: [
                {translateX: arrowSVGTranslateX},
                {rotateZ: arrowSVGRotationZ.interpolate({
                    inputRange: [-90, 90],
                    outputRange: ['-90deg', '90deg']
                })}
            ]
        },
        image: {
            transform: [
                {translateX: imageTranslateX}
            ]
        },
        settingsSVG: {
            transform: [
                {translateX: settingsSVGTranslateX}
            ]
        }
    });

    //ICONS
    const arrowSVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M53 445 c-7 -12 21 -45 129 -152 l138 -137 137 134 c75 74 136 140 134 145 -8 33 -10 32 -253 -182 -16 -14 -26 -8 -118 73 -156 138 -157 138 -167 119z"/></g></svg>`;
    const settingsSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32" style=" fill:#000000;"><path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z"></path></svg>`;
    
    //CALLBACK WHEN THE BUTTON IS PRESSED
    function handlePress()
    {
        props.navigation.navigate('GymPlanning');
    }

    //CALLBACK WHEN THE ARROW ICON IS PRESSED, IT STARTS THE ANIMATION
    function handleArrowSVGPress()
    {
        if (!resetKcalPressableOnScreen)
        {
            Animated.timing(settingsSVGTranslateX, {
                toValue: Dimensions.get('screen').width - 250,
                useNativeDriver: true
            }).start();

            Animated.timing(imageTranslateX, {
                toValue: Dimensions.get('screen').width - 250,
                useNativeDriver: true
            }).start();
    
            Animated.timing(arrowSVGTranslateX, {
                toValue: Dimensions.get('screen').width - 250,
                useNativeDriver: true
            }).start();
    
            Animated.timing(arrowSVGRotationZ, {
                toValue: 90,
                useNativeDriver: true
            }).start();
    
            Animated.timing(pressableTranslateX, {
                toValue: 50,
                useNativeDriver: true
            }).start();
    
            setResetKcalPressableOnScreen(true);
        }
        else
        {
            Animated.timing(pressableTranslateX, {
                toValue: -200,
                useNativeDriver: true
            }).start();

            Animated.timing(arrowSVGRotationZ, {
                toValue: -90,
                useNativeDriver: true
            }).start();

            Animated.timing(arrowSVGTranslateX, {
                toValue: -200,
                useNativeDriver: true
            }).start();

            Animated.timing(imageTranslateX, {
                toValue: Dimensions.get('screen').width / 2 - 375,
                useNativeDriver: true
            }).start();

            Animated.timing(settingsSVGTranslateX, {
                toValue: Dimensions.get('screen').width - 570,
                useNativeDriver: true
            }).start();

            setResetKcalPressableOnScreen(false);
        }
    }

    return (
        <View style={styles.view}>
            <Animated.View style={animateStyle.pressable}>
                <Pressable onPress={() => handlePress()} style={ ({pressed}) => pressed ? styles.pressablePressed : styles.pressable }>
                    <Text style={styles.text}>GYM PLANNING</Text>
                </Pressable>
            </Animated.View>
            <Animated.View style={[styles.arrowSVGView, animateStyle.arrowSVG]}>
                <SvgXml onPress={() => props.navigation.navigate('GymPlanning')} xml={arrowSVG} width="100%" height="100%" />
            </Animated.View>
            <Animated.View style={animateStyle.image}>
                <Image style={styles.image} source={ require('./src/images/title.png') } />
            </Animated.View>
            <Animated.View style={[styles.settingsSVGView, animateStyle.settingsSVG]}>
                <SvgXml onPress={() => {props.navigation.navigate('DietPlanSettings')}} xml={settingsSVG} width="100%" height="100%" />
            </Animated.View>
        </View>
    );
}

//LIST CONTAINING ALL THE MEALS
function MealList(props)
{
    //STYLE
    const styles = Style.MealListStyles;
    
    //CONVERTS THE DATA PROP OBJECT TO AN ARRAY SO IT CAN BE PASSED AS A PROP TO FLATLIST
    const dataArray = Object.values(props.data);

    return (
        <View style={styles.view}>
            {/* THE RESET BUTTON */}
            <TitleBar data={props.data} changeData={props.changeData} navigation={props.navigation} />
            {/* THE LIST CONTAINING ALL THE MEALS */}
            <FlatList
                style={styles.flatList}
                data={dataArray}
                renderItem={({item}) => <Meal data={props.data} changeData={props.changeData} mealName={item.meal_name} carbFat={item.carbFat} prot={item.prot} carbFatRem={item.carbFatRem} protRem={item.protRem} />}
            />
        </View>
    );
}

//THE PARENT COMPONENT, IT IS EXPORTED TO APP.JS
export default function DietPlan({ navigation })
{
    //THE STATE CONTAINS THE DATA OBJECT
    const [data, setData] = useState({});

    //READ THE DATA FILE AND SET THE DATA STATE WHEN THE COMPONENT MOUNTS FOR THE FIRST TIME
    useEffect(() => {

        FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

            const data = JSON.parse(value);
            handleChangeData(data);
        }).catch(error => {});
    }, []);

    //WHEN THE USER RETURNS ON THE DIETPLAN PAGE, THE DATA FILE IS READ FOR CHANGES
    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {

            FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

                const data = JSON.parse(value);
                handleChangeData(data);
            }).catch(error => {});
        });
    
        return unsubscribe;
      }, [navigation]);

    //STYLE
    const styles = Style.DietPlanStyles;

    //THIS FUNCTION IS PASSED AS A PROPS AND THE CHILD COMPONENTS CAN USE IT TO ALTER THE DATA OBJECT
    const handleChangeData = newData => {
        
        for (let meal in newData)
        {
            //DATA STATE NEEDS A KEY VALUE TO BE PASSED TO FLATLIST
            newData[meal].key = newData[meal].meal_name;
        }
        setData(newData);
    }

    return (
        <View style={styles.view}>
            <MealList data={data} changeData={handleChangeData} navigation={navigation} />
        </View>
    );
}