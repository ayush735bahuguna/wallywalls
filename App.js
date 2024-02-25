import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme, MD2DarkTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from 'react-query'
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Screens/Home'
import DetailPage from './Screens/DetailPage'
import CategoryScreen from './Screens/CategoryScreen'
import SerachPage from './Screens/SerachPage'
// import Settings from './Screens/Settings.js';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Dimensions, Text, View, useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

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
      {/* <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false, drawerIcon: ({ color }) => <FontAwesome6 name="gear" size={24} color={color} /> }} /> */}
    </Drawer.Navigator>
  );
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
const App = () => {
  const colorScheme = 'light'
  const DarkTheme = {
    ...MD2DarkTheme,
    // colors: {}
  }
  const LightTheme = {
    ...MD3LightTheme,
    // colors: {}
  }
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;
  NavigationBar.setBackgroundColorAsync("#000000");
  return (
    <PaperProvider theme={theme}>
      <StatusBar animated={true} style='auto' backgroundColor="#ffffff86" />
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