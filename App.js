
import React, { Component } from 'react'
import MyAppBar from './components/MyAppBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import { Surface } from 'react-native-paper';

export default function App() {
  return (
    <SafeAreaProvider>
        <MyAppBar />
    </SafeAreaProvider>
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