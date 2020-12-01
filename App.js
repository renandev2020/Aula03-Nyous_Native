import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

import Login from './pages/Login/login';
import Home from './pages/Home/home';

const Logout = ({navigation}) =>{
  return(

    <View style={styles.container}>

      <Text style={{color: "white", marginBottom: 20}}>Tem certeza de que quer sair?</Text>
      <Button title="Sair" onPress={() => {
        AsyncStorage.removeItem("jwt");
        navigation.push("Login");
      }}></Button>
      
    </View>
  )


}

const Autenticado = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Logout" component={Logout}/>
    </Drawer.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Autenticado" component={Autenticado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});