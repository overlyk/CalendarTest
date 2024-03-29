///this will show the Goals screen
//Split into Team Goals and User Goals

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react'
import Inputs from '../components/Inputs';
import HttpExample from '../components/ApiExample';
import { Surface, Text } from 'react-native-paper';
import MyTextBox from '../components/MyTextBox';
import MyAppBar from '../components/BottomNavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Goals() {
  return (
<View>
  <View style = {styles2.bluebox} />
  <View style = {styles2.bluebox} />
  <View style = {styles2.bluebox} />
  <Text>This is the Goals screen for UI elements related to goals</Text>
</View>
);
}

//test stylesheets - fine to delete
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
}
})
const styles2 = StyleSheet.create ({
container: {
 flexDirection: 'column',
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: 'grey',
 height: 600
},
redbox: {
 width: 100,
 height: 100,
 backgroundColor: 'red'
},
bluebox: {
 width: 100,
 height: 100,
 backgroundColor: 'blue'
},
blackbox: {
 width: 100,
 height: 100,
 backgroundColor: 'black'
},


});
const styles3 = StyleSheet.create({
surface: {
padding: 8,
height: 80,
width: 80,
alignItems: 'center',
justifyContent: 'center',
}});