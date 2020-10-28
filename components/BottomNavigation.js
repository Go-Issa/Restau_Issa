import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

import Food from '../src/Food'
import Cart from '../src/Cart'

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Food"
      tabBarOptions={{
        activeTintColor: '#33c37d',
      }}
    >
      <Tab.Screen
        name="Food"
        component={Food}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: ({ color }) => (
            <Icon name="md-restaurant" size={30} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color }) => (
            <Icon name="md-basket" size={30} color={color} />
          ),
          
        }}
      />
    </Tab.Navigator>
  );
}


export default MyTabs;