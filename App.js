import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/Home'
import DetailPage from './Screens/DetailPage'
import CategoryScreen from './Screens/CategoryScreen'
import SerachPage from './Screens/SerachPage'
import Settings from './Screens/Settings.js';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Category" component={CategoryScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}
const App = () => {
  return (
    <PaperProvider>
      <StatusBar animated={true} style='auto' />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="DetailPage" component={DetailPage} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SerachPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  )
}

export default App