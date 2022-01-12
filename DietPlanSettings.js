import * as FileSystem from 'expo-file-system';
import { useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import * as Style from './DietPlanSettingsStyle';

//THE TITLE BAR
function TitleBar(props)
{
    //STYLE
    const styles = Style.TitleBarStyles;

    return (
        <View style={styles.view}>
            <Pressable style={styles.pressable} onPress={() => {props.navigation.navigate("DietPlan")}}>
                <Image style={styles.arrowImage} source={require('./src/images/left_arrow.png')} />
            </Pressable>
            <Text style={styles.text}>Settings</Text>
        </View>
    );
}

//THIS COMPONENT IS USED TO ADD A NEW MEAL
function AddMeal(props)
{
    //THE STATE HAS THE SAME VALUE AS THE TEXTINPUT COMPONENT
    const [textInputValue, setTextInputValue] = useState('');

    //STYLE
    const styles = Style.AddMealStyles;

    //CALLBACK WHEN THE ADD BUTTON IS PRESSED, IT CREATES A NEW MEAL
    function handlePress()
    {
        const meal_name = textInputValue.toUpperCase();

        if (meal_name == '')
            return;

        let data;

        FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

            data = JSON.parse(value);
            data[meal_name] = {
                meal_name: meal_name,
                carbFat: 0,
                prot: 0,
                carbFatRem: 0,
                protRem: 0
            };
            
            setTextInputValue('');
            FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data));
        }).catch(error => {

            data[meal_name] = {
                meal_name: meal_name,
                carbFat: 0,
                prot: 0,
                carbFatRem: 0,
                protRem: 0
            };
            
            setTextInputValue('');
            FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data));
        });
    }

    return (
        <View style={styles.view}>
            {/* TEXTINPUT COMPONENT */}
            <TextInput placeholder='Meal name' onSubmitEditing={() => handlePress()} style={styles.textInput} value={textInputValue} onChangeText={(e) => setTextInputValue(e)} />
            {/* ADD BUTTON */}
            <Pressable style={ ({pressed}) => pressed ? styles.pressablePressed : styles.pressable } onPress={() => handlePress()}>
                <Text style={styles.pressableText}>ADD</Text>
            </Pressable>
        </View>
    );
}

//THE EXPORTED COMPONENT
export default function DietPlanSettings({ navigation })
{
    //STYLE
    const styles = Style.DietPlanSettingsStyles;

    return (
        <View style={styles.view}>
            <TitleBar navigation={navigation} />
            <AddMeal />
        </View>
    );
}