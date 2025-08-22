import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Your main tab screens
import MessScreen from '../screens/mess';
import KitchenResult from '../screens/KitchenResult';
import PlanSelection from '../screens/PlanSelection';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Mess') iconName = 'restaurant-outline';
          else if (route.name === 'Kitchens') iconName = 'home-outline';
          else if (route.name === 'Plans') iconName = 'list-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Mess" component={MessScreen} />
      <Tab.Screen name="Kitchens" component={KitchenResult} />
      <Tab.Screen name="Plans" component={PlanSelection} />
    </Tab.Navigator>
  );
}
