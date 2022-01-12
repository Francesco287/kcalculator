import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DietPlan from './DietPlan.js';
import DietPlanSettings from './DietPlanSettings';

//APP.JS HANDLES THE NAVIGATION
const Stack = createNativeStackNavigator();

export default function App(props)
{
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='DietPlan'>
        <Stack.Screen name="DietPlan" component={DietPlan} />
        <Stack.Screen name="DietPlanSettings" component={DietPlanSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}