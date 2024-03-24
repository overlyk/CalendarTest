import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react'
import Inputs from '../components/Inputs';
import HttpExample from '../components/ApiExample';
import { Surface, Text } from 'react-native-paper';
import MyTextBox from '../components/MyTextBox';
import MyAppBar from '../components/BottomNavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function MainMenu() {
  return (
    <View>
      <Inputs />
      <HttpExample />
      <Surface style={styles3.surface} elevation={4}>
        <Text>Surface2</Text>
      </Surface>
      <MyTextBox label="test custom label"/>
      <View style={styles2.redbox} />
      <View style={styles2.bluebox} />
      <View style={styles2.blackbox} />
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