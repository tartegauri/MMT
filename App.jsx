import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/ThemeContext';
import OnboardingScreen from './src/screens/onboarding/index';
import LoginScreen from './src/screens/login/index';
import GetCode from './src/screens/login/components/GetCode';
import FillCode from './src/screens/login/components/FillCode';
import LoginName from './src/screens/login/components/LoginName';
import GetLocation from './src/screens/login/components/GetLocation';

import ManualLocation from './src/screens/login/components/ManualLocation';
import PlanSelection from './src/screens/PlanSelection';
import KitchenMatching from './src/screens/KItchenMatching';
import KitchenResult from './src/screens/KitchenResult';
import SelectPlan from './src/screens/plans/SelectPlan';
import CustomizePlan from './src/screens/plans/CustomizePlan';
import SelectDuration from './src/screens/plans/SelectDuration';
import SelectDessert from './src/screens/plans/SelectDessert';
import SpecialVegThali from './src/screens/KitchenResult/components/SpecialVegThali';
import MessScreen from './src/screens/mess';
import NormalVegThali from './src/screens/KitchenResult/components/NormalVegThali';
import Home from './src/screens/Home';
import MapLocation from './src/screens/login/components/geolocation/MapLocation';
import ActivePlans from './src/screens/Home/components/ActivePlans';
import PersonalDetails from './src/screens/Home/components/PersonalDetails';
import  Settings  from './src/screens/Home/components/Settings';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding"
            component={OnboardingScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GetCode"
            component={GetCode}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="FillCode"
            component={FillCode}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginName"
            component={LoginName}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="GetLocation"
            component={GetLocation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="ManualLocation"
            component={ManualLocation}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PlanSelection"
            component={PlanSelection}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="KitchenMatching"
            component={KitchenMatching}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="KitchenResult"
            component={KitchenResult}
            />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SelectPlan"
            component={SelectPlan}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="CustomizedPlan"
            component={CustomizePlan}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="SelectDuration"
            component={SelectDuration}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="SelectDessert"
            component={SelectDessert}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="SpecialVegThali"
            component={SpecialVegThali}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="MessScreen"
            component={MessScreen}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="NormalVegThali"
            component={NormalVegThali}
            />
           <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
           <Stack.Screen
            options={{ headerShown: false }}
            name="ActivePlans"
            component={ActivePlans}
          />
           <Stack.Screen
            options={{ headerShown: false }}
            name="PersonalDetails"
            component={PersonalDetails}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Settings"
            component={Settings}
          />
          <Stack.Screen 
            name="MapLocation" 
            component={MapLocation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  text: {
    fontSize: 24,
    color: '#000000', 
    fontWeight: 'bold',
  },
});
