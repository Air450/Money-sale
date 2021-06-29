import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    TransitionPresets,
  } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import About from "./About";
import TabNavigation from "./TabNavigation";

export default function StackNavigation(){

    const Stack = createStackNavigator();

    return (
<NavigationContainer>
          <StatusBar style={{backgroundColor: '#1db57c'}} />
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1db57c',
              },
              headerTitleStyle: {
                fontSize: 16,
                fontWeight: "bold",
                fontFamily: "Defago-Bold",
                fontWeight: "200",
                color: '#fff'
              },
              headerTintColor: '#fff',
              headerTitleAlign: "center",
              gestureEnabled: false,
              gestureDirection: "horizontal",
             
            }}
            initialRouteName="TabNavigation"
          >
              <Stack.Screen
                name="TabNavigation"
                component={TabNavigation}
                options={{
                  header: () => null,
                }}
              />
            <Stack.Screen
              name="About"
              component={About}
              options={{
                title:"ກ່ຽວກັບແອັບ",
                ...TransitionPresets.ModalSlideFromBottomIOS,
                headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  backgroundColor: "#1db57c",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
}