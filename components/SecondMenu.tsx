import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react'
import Inputs from './Inputs';
import HttpExample from './HttpExample';
import { Surface, Text } from 'react-native-paper';
import MyTextBox from './MyTextBox';
import MyAppBar from './MyAppBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function SecondMenu() {
  return (
<View>
  <View style = {styles2.bluebox} />
  <View style = {styles2.bluebox} />
  <View style = {styles2.bluebox} />
  <Text>This is the 2nd Screen</Text>
</View>
);
}

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