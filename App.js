
import React from 'react';
import {TouchableWithoutFeedback, Keyboard } from 'react-native';
import DefagoBold from "./assets/fonts/NotoSansLao-Bold.ttf";
import Defago from "./assets/fonts/NotoSansLao-Regular.ttf";
import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";
import firebase from 'firebase';
import StackNavigation from './components/StackNavigation';
import { firebaseConfig } from './components/config';
import 'firebase/firestore';


firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();


export default function App() {

  let [fontsLoaded] = useFonts({
    "Defago": Defago,
    "Defago-Bold": DefagoBold,
  });


  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  } else {
    return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <StackNavigation/>
     </TouchableWithoutFeedback>
    );
  }

}


