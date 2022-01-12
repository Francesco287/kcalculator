// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, Pressable, FlatList, Image } from 'react-native';
// import * as FileSystem from 'expo-file-system';
// import { SvgXml } from 'react-native-svg';
// import Dialog from "react-native-dialog";
// import * as Style from "./DietPlanStyle";

// //REMAINING CALORIES OF A SINGLE MEAL
// class RemainingCalories extends React.Component
// {
//     constructor(props)
//     {
//         super(props);

//         //THE STATE IS FOR THE TEXTINPUTS
//         this.state = { textInputCarbFat: '', textInputProt: '' };
//     }

//     //STYLE
//     styles = Style.RemainingCaloriesStyles;

//     //ALTERS THE CALORIES REMAINING FROM CARB/FAT
//     handleCarbFatAlter()
//     {
//         if(isNaN(this.state.textInputCarbFat) || Math.abs(parseInt(this.state.textInputCarbFat)) >= 100000 ||
//         this.state.textInputCarbFat == "")
//             return;

//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             let data = JSON.parse(value);
//             data[this.props.mealName].carbFatRem -= parseInt(this.state.textInputCarbFat);

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

//                 this.setState({textInputCarbFat: ''});
//                 this.props.changeData(data);
//             });
//         });
//     }

//     //ALTER THE CALORIES REMAINING FROM PROTEINS
//     handleProtAlter()
//     {
//         if(isNaN(this.state.textInputProt) || Math.abs(parseInt(this.state.textInputProt)) >= 100000 ||
//         this.state.textInputProt == "")
//             return;

//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             let data = JSON.parse(value);
//             data[this.props.mealName].protRem -= parseInt(this.state.textInputProt);

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

//                 this.setState({textInputProt: ''});
//                 this.props.changeData(data);
//             });
//         });
//     }

//     render()
//     {
//         return (
//             <View style={this.styles.remCalView}>
//                 <Text style={this.styles.carbFatRemProtRemTitle}>Remaining calories from:</Text>
//                 {/* REMAINING CALORIES FROM CARB/FAT AND TEXTINPUT TO MODIFY THEM */}
//                 <View style={this.styles.remCalProtCarbFatView}>
//                     <Text style={this.styles.carbFatRemProtRem}>Carb/fat: {this.props.carbFatRem}</Text>
//                     <View style={this.styles.applyTextInput}>
//                         <TextInput value={this.state.textInputCarbFat} onChangeText={(value) => {this.setState({textInputCarbFat: value})}} keyboardType='numeric' style={this.styles.textInput} />
//                         <Pressable onPress={() => {this.handleCarbFatAlter()}} style={this.styles.pressable}>
//                             <Text style={this.styles.pressableText}>Apply</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//                 {/* REMAINING CALORIES FROM PROTEINS AND TEXTINPUT TO MODIFY THEM */}
//                 <View style={this.styles.remCalProtCarbFatView}>
//                     <Text style={this.styles.carbFatRemProtRem}>Proteins: {this.props.protRem}</Text>
//                     <View style={this.styles.applyTextInput}>
//                         <TextInput value={this.state.textInputProt} onChangeText={(value) => {this.setState({textInputProt: value})}} keyboardType='numeric' style={this.styles.textInput} />
//                         <Pressable onPress={() => {this.handleProtAlter()}} style={this.styles.pressable}>
//                             <Text style={this.styles.pressableText}>Apply</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }

// //SINGLE MEAL
// class Meal extends React.Component
// {
//     constructor(props)
//     {
//         super(props);

//         //THE STATE IS FOR THE DIALOG
//         this.state = { dialogVisible: false, dialogInputProteins: '', dialogInputCarbFat: '' };
//     }

//     //ICONS
//     settingsSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 32 32" style=" fill:#000000;"><path d="M 13.1875 3 L 13.03125 3.8125 L 12.4375 6.78125 C 11.484375 7.15625 10.625 7.683594 9.84375 8.3125 L 6.9375 7.3125 L 6.15625 7.0625 L 5.75 7.78125 L 3.75 11.21875 L 3.34375 11.9375 L 3.9375 12.46875 L 6.1875 14.4375 C 6.105469 14.949219 6 15.460938 6 16 C 6 16.539063 6.105469 17.050781 6.1875 17.5625 L 3.9375 19.53125 L 3.34375 20.0625 L 3.75 20.78125 L 5.75 24.21875 L 6.15625 24.9375 L 6.9375 24.6875 L 9.84375 23.6875 C 10.625 24.316406 11.484375 24.84375 12.4375 25.21875 L 13.03125 28.1875 L 13.1875 29 L 18.8125 29 L 18.96875 28.1875 L 19.5625 25.21875 C 20.515625 24.84375 21.375 24.316406 22.15625 23.6875 L 25.0625 24.6875 L 25.84375 24.9375 L 26.25 24.21875 L 28.25 20.78125 L 28.65625 20.0625 L 28.0625 19.53125 L 25.8125 17.5625 C 25.894531 17.050781 26 16.539063 26 16 C 26 15.460938 25.894531 14.949219 25.8125 14.4375 L 28.0625 12.46875 L 28.65625 11.9375 L 28.25 11.21875 L 26.25 7.78125 L 25.84375 7.0625 L 25.0625 7.3125 L 22.15625 8.3125 C 21.375 7.683594 20.515625 7.15625 19.5625 6.78125 L 18.96875 3.8125 L 18.8125 3 Z M 14.8125 5 L 17.1875 5 L 17.6875 7.59375 L 17.8125 8.1875 L 18.375 8.375 C 19.511719 8.730469 20.542969 9.332031 21.40625 10.125 L 21.84375 10.53125 L 22.40625 10.34375 L 24.9375 9.46875 L 26.125 11.5 L 24.125 13.28125 L 23.65625 13.65625 L 23.8125 14.25 C 23.941406 14.820313 24 15.402344 24 16 C 24 16.597656 23.941406 17.179688 23.8125 17.75 L 23.6875 18.34375 L 24.125 18.71875 L 26.125 20.5 L 24.9375 22.53125 L 22.40625 21.65625 L 21.84375 21.46875 L 21.40625 21.875 C 20.542969 22.667969 19.511719 23.269531 18.375 23.625 L 17.8125 23.8125 L 17.6875 24.40625 L 17.1875 27 L 14.8125 27 L 14.3125 24.40625 L 14.1875 23.8125 L 13.625 23.625 C 12.488281 23.269531 11.457031 22.667969 10.59375 21.875 L 10.15625 21.46875 L 9.59375 21.65625 L 7.0625 22.53125 L 5.875 20.5 L 7.875 18.71875 L 8.34375 18.34375 L 8.1875 17.75 C 8.058594 17.179688 8 16.597656 8 16 C 8 15.402344 8.058594 14.820313 8.1875 14.25 L 8.34375 13.65625 L 7.875 13.28125 L 5.875 11.5 L 7.0625 9.46875 L 9.59375 10.34375 L 10.15625 10.53125 L 10.59375 10.125 C 11.457031 9.332031 12.488281 8.730469 13.625 8.375 L 14.1875 8.1875 L 14.3125 7.59375 Z M 16 11 C 13.25 11 11 13.25 11 16 C 11 18.75 13.25 21 16 21 C 18.75 21 21 18.75 21 16 C 21 13.25 18.75 11 16 11 Z M 16 13 C 17.667969 13 19 14.332031 19 16 C 19 17.667969 17.667969 19 16 19 C 14.332031 19 13 17.667969 13 16 C 13 14.332031 14.332031 13 16 13 Z"></path></svg>`;
//     trashSVG = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24" style=" fill:#fa314a;"><path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path></svg>`;

//     //STYLE
//     styles = Style.MealStyles;

//     //CALLBACK WHEN THE DIALOG'S BUTTON APPLY IS PRESSED, IT ALTERS THE DEFAULT KCAL OF THE MEAL
//     handleApply = () => {

//         if (isNaN(parseInt(this.state.dialogInputCarbFat)) || isNaN(parseInt(this.state.dialogInputProteins)) ||
//         Math.abs(parseInt(this.state.dialogInputProteins)) >= 100000 || Math.abs(parseInt(this.state.dialogInputCarbFat)) >= 100000)
//             return;

//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             let data = JSON.parse(value);
            
//             data[this.props.mealName].carbFat = Math.abs(parseInt(this.state.dialogInputCarbFat));
//             data[this.props.mealName].prot = Math.abs(parseInt(this.state.dialogInputProteins));

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

//                 this.setState({ dialogVisible: false, dialogInputProteins: '', dialogInputCarbFat: '' });
//             });
//         });
//     }

//     //CALLBACK WHEN THE TRASH ICON IS PRESSED, IT DELETES THE MEAL
//     handleTrashSVGPress()
//     {
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {
            
//             let data = JSON.parse(value);
//             delete data[this.props.mealName];
            
//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

//                 this.props.changeData(data);
//             });
//         });
//     }

//     render()
//     {
//         return (
//             <View style={this.styles.view}>
//                 {/* TITLE OF THE MEAL WITH THE ICONS */}
//                 <View style={this.styles.titleView}>
//                     <Text style={this.styles.mealName}>{this.props.mealName}</Text>
//                     {/* WHEN THE SETTINGS ICON IS PRESSED, THE DIALOG SHOWS UP */}
//                     <SvgXml onPress={() => { this.setState({ dialogVisible: true }) }} xml={this.settingsSVG} width="13%" height="100%" />
//                     <SvgXml onPress={() => { this.handleTrashSVGPress() }} xml={this.trashSVG} width="13%" height="100%" />
//                 </View>
//                 {/* REMAINING CALORIES */}
//                 <RemainingCalories changeData={this.props.changeData} mealName={this.props.mealName} carbFatRem={this.props.carbFatRem} protRem={this.props.protRem} />
//                 {/* DIALOG TO ALTER THE DEFALUT CALORIES */}
//                 <Dialog.Container visible={this.state.dialogVisible}>
//                     <Dialog.Title>Set default calories</Dialog.Title>
//                     <Dialog.Input onChangeText={(value) => { this.setState({ dialogInputCarbFat: value }) }} placeholder='Calories from carb/fat' keyboardType='numeric' value={this.state.dialogInputCarbFat} />
//                     <Dialog.Input onChangeText={(value) => { this.setState({ dialogInputProteins: value }) }} placeholder='Calories from proteins' keyboardType='numeric' value={this.state.dialogInputProteins} />
//                     <Dialog.Button onPress={() => { this.setState({ dialogVisible: false, dialogInputProteins: '', dialogInputCarbFat: '' }) }} label="Cancel" />
//                     <Dialog.Button onPress={() => { this.handleApply() }} label="Apply" />
//                 </Dialog.Container>
//             </View>
//         );
//     }
// }

// //THE RESET BUTTON, IT RESETS THE REMAINING CALORIES TO THE DEFAULT CALORIES
// class ResetPressable extends React.Component
// {
//     //STYLE
//     styles = Style.ResetPressableStyles;

//     //ICON
//     arrowSVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M53 445 c-7 -12 21 -45 129 -152 l138 -137 137 134 c75 74 136 140 134 145 -8 33 -10 32 -253 -182 -16 -14 -26 -8 -118 73 -156 138 -157 138 -167 119z"/></g></svg>`;
//     titleSVG = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="404.000000pt" height="131.000000pt" viewBox="0 0 404.000000 131.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,131.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M10 655 l0 -655 125 0 125 0 2 294 3 295 205 -295 205 -294 152 0 153 0 -104 143 c-386 533 -397 549 -384 568 7 10 120 149 250 309 l238 290 -153 -1 -152 0 -205 -262 -205 -262 -3 263 -2 262 -125 0 -125 0 0 -655z"/><path d="M1463 1033 c-10 -4 -13 -75 -13 -309 l0 -304 45 0 45 0 0 310 0 310 -32 -1 c-18 0 -39 -3 -45 -6z"/><path d="M2468 1033 c-17 -4 -18 -27 -18 -309 l0 -304 45 0 45 0 0 310 0 310 -27 -1 c-16 -1 -36 -3 -45 -6z"/><path d="M3083 959 c-32 -9 -33 -12 -33 -59 0 -49 -1 -50 -30 -50 -28 0 -30 -2 -30 -40 0 -38 2 -40 29 -40 l29 0 4 -139 c3 -123 5 -143 24 -168 27 -35 83 -57 126 -49 54 10 59 17 46 59 -11 35 -14 37 -40 32 -52 -12 -58 4 -58 141 l0 123 49 3 49 3 -15 38 c-13 33 -19 37 -49 37 l-34 0 0 60 c0 66 -2 68 -67 49z"/><path d="M776 860 c-89 -27 -146 -111 -146 -217 0 -98 40 -171 115 -211 44 -23 139 -20 198 6 l48 21 -17 33 c-9 18 -18 34 -19 36 -1 1 -21 -5 -45 -13 -65 -23 -105 -19 -140 13 -40 35 -55 95 -39 157 22 86 90 115 188 80 l41 -14 14 32 c17 41 8 53 -57 72 -56 16 -97 18 -141 5z"/> <path d="M1117 856 c-59 -16 -71 -28 -63 -58 12 -46 19 -50 65 -33 46 16 99 19 117 7 15 -10 34 -47 34 -66 0 -13 -13 -16 -72 -16 -95 0 -146 -27 -167 -86 -47 -134 93 -237 226 -165 18 9 24 8 31 -5 6 -10 19 -14 43 -12 l34 3 0 172 c0 196 -4 209 -85 251 -49 25 -92 27 -163 8z m153 -275 c0 -34 -5 -42 -34 -60 -45 -28 -90 -27 -110 1 -22 31 -20 45 9 73 20 21 34 25 80 25 l55 0 0 -39z"/><path d="M1746 860 c-89 -27 -146 -111 -146 -217 0 -98 40 -171 115 -211 44 -23 139 -20 198 6 l48 21 -17 33 c-9 18 -18 34 -19 36 -1 1 -21 -5 -45 -13 -65 -23 -105 -19 -140 13 -40 35 -55 95 -39 157 22 86 90 115 188 80 l41 -14 14 32 c17 41 8 53 -57 72 -56 16 -97 18 -141 5z"/><path d="M2702 851 c-29 -10 -54 -20 -57 -23 -6 -6 17 -78 25 -78 4 0 24 7 43 15 77 32 147 10 147 -46 l0 -29 -65 0 c-118 0 -175 -43 -175 -132 0 -85 36 -127 120 -141 22 -4 54 0 87 12 42 14 53 15 57 4 3 -7 21 -13 41 -13 l36 0 -3 179 -3 180 -35 36 c-55 57 -125 68 -218 36z m158 -271 c0 -35 -5 -43 -32 -60 -62 -37 -118 -18 -118 40 0 40 32 60 97 60 l53 0 0 -40z"/><path d="M3417 860 c-45 -14 -95 -58 -119 -103 -17 -32 -22 -59 -22 -117 0 -123 53 -197 157 -220 106 -24 214 35 247 135 17 52 9 161 -16 210 -31 60 -88 96 -160 101 -32 2 -72 -1 -87 -6z m134 -108 c51 -46 57 -150 12 -211 -46 -61 -149 -47 -179 24 -58 139 66 278 167 187z"/><path d="M2000 693 c0 -207 11 -240 84 -268 52 -20 102 -15 154 16 35 20 52 18 52 -7 0 -11 9 -14 38 -12 l37 3 3 218 2 217 -50 0 -50 0 0 -149 c0 -147 0 -150 -25 -169 -65 -51 -132 -52 -146 -2 -4 14 -7 91 -8 173 l-1 147 -45 0 -45 0 0 -167z"/><path d="M3740 639 l0 -220 48 3 47 3 3 147 3 147 43 26 c23 14 55 25 69 25 30 0 31 1 16 53 -12 45 -27 47 -94 12 -49 -24 -64 -22 -65 13 0 7 -14 12 -35 12 l-35 0 0 -221z"/></g></svg>`;

//     //CALLBACK WHEN THE BUTTON IS PRESSED
//     handlePress()
//     {
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             let data = JSON.parse(value);

//             for (let element in data)
//             {
//                 data[element].carbFatRem = data[element].carbFat;
//                 data[element].protRem = data[element].prot;
//             }

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data)).then(() => {

//                 this.props.changeData(data);
//             });
//         });
//     }

//     render()
//     {
//         return (
//             <View style={this.styles.view}>
//                 <Pressable onPress={() => this.handlePress()} style={ ({pressed}) => pressed ? this.styles.pressablePressed : this.styles.pressable }>
//                     <Text style={this.styles.text}>RESET KCAL</Text>
//                 </Pressable>
//                 <SvgXml xml={this.arrowSVG} width="20%" height="50%" />
//                 <Image style={this.styles.image} source={ require('./src/images/title.png') } />
//             </View>
//         );
//     }
// }

// //LIST CONTAINING ALL THE MEALS
// class MealList extends React.Component
// {
//     //STYLE
//     styles = Style.MealListStyles;

//     handleChangeData = newData => {

//         for (let meal in newData)
//         {
//             //DATA STATE NEEDS A KEY VALUE TO BE PASSED TO FLATLIST
//             newData[meal].key = newData[meal].meal_name;
//         }
//         //this.setState({data: newData});
//         this.props.changeData(data);
//     }

//     render()
//     {
//         //CONVERTS THE DATA PROP OBJECT TO AN ARRAY SO IT CAN BE PASSED AS A PROP TO FLATLIST
//         const dataArray = Object.values(this.props.data);

//         return (
//             <View style={this.styles.view}>
//                 {/* THE RESET BUTTON */}
//                 <ResetPressable changeData={this.props.changeData} />
//                 {/* THE LIST CONTAINING ALL THE MEALS */}
//                 <FlatList
//                     style={this.styles.flatList}
//                     data={dataArray}
//                     renderItem={({item}) => <Meal changeData={this.props.changeData} mealName={item.meal_name} carbFat={item.carbFat} prot={item.prot} carbFatRem={item.carbFatRem} protRem={item.protRem} />}
//                 />
//             </View>
//         );
//     }
// }

// //THE BAR WITH THE ADD BUTTON, IT IS USED TO ADD A NEW MEAL
// class AddMeal extends React.Component
// {
//     constructor(props)
//     {
//         super(props);

//         //THE STATE HAS THE SAME VALUE AS THE TEXTINPUT COMPONENT
//         this.state = {textInputValue: ''}
//     }

//     //STYLE
//     styles = Style.AddMealStyles;

//     //CALLBACK WHEN THE ADD BUTTON IS PRESSED, IT CREATES A NEW MEAL
//     handlePress()
//     {
//         const meal_name = this.state.textInputValue.toUpperCase();

//         if (meal_name == '')
//             return;
        
//         let data;

//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             data = JSON.parse(value);
//             data[meal_name] = {
//                 meal_name: meal_name,
//                 carbFat: 0,
//                 prot: 0,
//                 carbFatRem: 0,
//                 protRem: 0
//             };

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data));
//         }).catch(error => {

//             data = {
//                 [meal_name]: {
//                     meal_name: meal_name,
//                     carbFat: 0,
//                     prot: 0,
//                     carbFatRem: 0,
//                     protRem: 0
//                 }
//             }

//             FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'data', JSON.stringify(data));
//         }).then(() => {

//             this.setState({textInputValue: ''});
//             this.props.changeData(data);
//         });
//     }

//     render()
//     {
//         return (
//             <View style={this.styles.view}>
//                 {/* TEXTINPUT COMPONENT */}
//                 <TextInput onSubmitEditing={() => this.handlePress()} style={this.styles.textInput} value={this.state.textInputValue} onChangeText={(e) => this.setState({textInputValue: e})} />
//                 {/* ADD BUTTON */}
//                 <Pressable style={ ({pressed}) => pressed ? this.styles.pressablePressed : this.styles.pressable } onPress={() => this.handlePress()}>
//                     <Text style={this.styles.pressableText}>ADD</Text>
//                 </Pressable>
//             </View>
//         );
//     }
// }

// //THE PARENT COMPONENT, IT IS EXPORTED TO APP.JS
// export default class DietPlan extends React.Component
// {
//     constructor(props)
//     {

//         super(props);

//         //THE STATE CONTAINS THE DATA OBJECT
//         this.state = {data: {}};
//     }

//     //STYLE
//     styles = Style.DietPlanStyles;

//     //THIS FUNCTION IS PASSED AS A PROPS AND THE CHILD COMPONENTS CAN USE IT TO ALTER THE DATA OBJECT
//     handleChangeData = newData => {

//         for (let meal in newData)
//         {
//             //DATA STATE NEEDS A KEY VALUE TO BE PASSED TO FLATLIST
//             newData[meal].key = newData[meal].meal_name;
//         }
//         this.setState({data: newData});
//     }

//     componentDidMount()
//     {
//         FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'data').then(value => {

//             const data = JSON.parse(value);
//             this.handleChangeData(data);
//         }).catch(error => {});
//     }

//     render()
//     {
//         return (
//             <View style={this.styles.view} key={this.state.refresh}>
//                 <AddMeal changeData={this.handleChangeData} />
//                 <MealList data={this.state.data} changeData={this.handleChangeData} />
//             </View>
//         );
//     }
// }