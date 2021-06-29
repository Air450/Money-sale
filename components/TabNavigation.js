import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MoneyExchange from './MoneyExchange';
import OilPrice from './OilPrice';
import GoldPrice from './GoldPrice';
import Covid from './Covid';
import About from './About';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
    <Tab.Navigator
        tabBarOptions={{
            keyboardHidesTabBar: true,
            style:{
                backgroundColor: '#1DB57C',
                height: 65,
                borderTopWidth: 0,
                elevation: 5
            },
            activeBackgroundColor:'#019c64',
            tabStyle: {
                borderTopWidth: 0,
                width: 20,
                flex: 1,
                paddingTop: 7,
                paddingBottom: 8,
                justifyContent: 'center',
                alignItems: 'center'
            }
        }}
      >
        {/* Money Exchange Screen */}
        <Tab.Screen name="MoneyExchange" component={MoneyExchange} options={{
        tabBarIcon: (({focused})=> {
            return (
                <FontAwesome name="money" size={ focused ? 28 : 24} color={focused ? '#fff' : '#dfdfdf'} />   
            )
        }),
        tabBarLabel:(({focused})=> (  <Text style={{color: "#ffffff",fontFamily: focused ? 'Defago-Bold' : 'Defago', fontSize: 13}}>ອັດຕາແລກປ່ຽນ</Text>)),
        }}
         />

         {/* Oil Price Screen */}
        <Tab.Screen name="OilPrice" component={OilPrice} options={{

        tabBarIcon: (({focused})=> {
            return (
                <FontAwesome5 name="oil-can" size={ focused ? 28 : 24} color={focused ? '#fff' : '#dfdfdf'} />   
            )
        }),
        tabBarLabel:(({focused})=> (  <Text style={{color: "#ffffff",fontFamily: focused ? 'Defago-Bold' : 'Defago', fontSize: 13}}>ລາຄານ້ຳມັນ</Text>))
        }}/>

         {/* Gold Price Screen */}
        <Tab.Screen name="GoldPrice" component={GoldPrice} options={{
        tabBarIcon: (({focused})=> {
            return (
                <MaterialCommunityIcons name="gold" size={ focused ? 28 : 24} color={focused ? '#fff' : '#dfdfdf'} />   
            )
        }),
        tabBarLabel:(({focused})=> (  <Text style={{color: "#ffffff",fontFamily: focused ? 'Defago-Bold' : 'Defago', fontSize: 13}}>ລາຄາຄຳ</Text>))
        }}/>

           {/* Covid Tracker Screen */}
        <Tab.Screen name="Covid" component={Covid} options={{
        tabBarIcon: (({focused})=> {
            return (
                <MaterialCommunityIcons name="virus" size={ focused ? 28 : 24} color={focused ? '#fff' : '#dfdfdf'} />   
            )
        }),
        tabBarLabel:(({focused})=> (  <Text style={{color: "#ffffff",fontFamily: focused ? 'Defago-Bold' : 'Defago', fontSize: 13}}>ໂຄວິດ-19</Text>))
        }}/>
         
        
      </Tab.Navigator>

    )
}




