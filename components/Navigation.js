import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../src/LoginScreen';
import RegisterScreen from '../src/RegisterScreen';
import App from '../src/index';
import Food from '../src/Food'
import MyTbas from './BottomNavigation';

const Stack = createStackNavigator();

function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
          <Stack.Screen name="Home" component={MyTbas} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default Navigation;
