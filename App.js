import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query'
import { DrawerItem, createDrawerNavigator, useDrawerProgress } from '@react-navigation/drawer';
import HomeScreen from './Screens/Home'
import DetailPage from './Screens/DetailPage'
import CategoryScreen from './Screens/CategoryScreen'

import SerachPage from './Screens/SerachPage'
import Settings from './Screens/Settings.js';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Dimensions, Text, View } from 'react-native';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false, drawerIcon: ({ color }) => <Entypo name="home" size={24} color={color} /> }} />
      <Drawer.Screen name="Category" component={CategoryScreen} options={{ headerShown: false, drawerIcon: ({ color }) => <MaterialIcons name="category" size={24} color={color} /> }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false, drawerIcon: ({ color }) => <FontAwesome6 name="gear" size={24} color={color} /> }} />
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


function CustomDrawerContent(props) {
  const screenHeight = Dimensions.get("window").height;

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: 'white', height: screenHeight, display: 'flex', justifyContent: 'space-between' }}>
        <View>

          <Text className='text-2xl py-4 px-2'> Wallywalls</Text>
          <DrawerItemList {...props} /></View>
        <Text className='text-center p-5'>Powered by ❤ and unsplash</Text>
      </View>
    </DrawerContentScrollView>
  );
}



export default App