import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { BottomNavigation, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const Tab = createMaterialBottomTabNavigator();
import HomeScreen from './Screens/Home'
import DetailPage from './Screens/DetailPage'
import CategoryScreen from './Screens/CategoryScreen'
import SerachPage from './Screens/SerachPage'
import Settings from './Screens/Settings.js';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const TabNavigation = () => {
  return <Tab.Navigator
    initialRouteName="Home"
    activeColor="#3422D4"
    inactiveColor="#3e2465"
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{
      title: 'Home',
      headerShown: false,
      tabBarIcon: ({ color }) => (<Feather name="home" size={24} color={color} />),
    }} />
    <Tab.Screen name="Category" component={CategoryScreen} options={{
      title: 'Category',
      headerShown: false,
      tabBarIcon: ({ color }) => (<MaterialIcons name="category" size={24} color={color} />),
    }} />
    <Tab.Screen name="Settings" component={Settings} options={{
      title: 'Settings',
      headerShown: false,
      tabBarIcon: ({ color }) => (<Octicons name="gear" size={24} color={color} />),
    }} />
  </Tab.Navigator>
};

const App = () => {
  return (
    <PaperProvider>
      <StatusBar animated={true} style='auto' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="DetailPage" component={DetailPage} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SerachPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  )
}

export default App