import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import React, { Component } from 'react'
import Inputs from '../components/Inputs';
import HttpExample from '../components/ApiExample';
import { Button, Surface, Text } from 'react-native-paper';
import MyTextBox from '../components/MyTextBox';
import MyAppBar from '../components/BottomNavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User } from '../api/models/User';
import { DatePickerModal } from 'react-native-paper-dates';

export default function Home({currentUser} : {currentUser: User} ) {
  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );
  return (
    <View style={background.container}>
     <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          Pick single date
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </View>
    </View>
  );
}
//use these to style the components (similar to CSS)
const background = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'green',
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
height: 120,
width: 400,
backgroundColor: 'green',
alignItems: 'center',
justifyContent: 'center',
}});