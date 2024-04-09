import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { Activity } from '../api/models/Activity';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function LogoutButton({ handleLogout } : { handleLogout: () => void}) {
  return (
    <View>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress = {handleLogout}>
            <Text style = {styles.submitButtonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
       paddingTop: 20,
       flex: 1,
       //alignContent: 'center',
       backgroundColor: '#6FCA35'
    },
    midContainer: {
      flex: 1,
      //alignContent: 'center',
      backgroundColor: '#6FCA35'
   },
    input: {
       margin: 15,
       
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: 'green',
       padding: 10,
       margin: 15,
       height: 40,
       width: 100,
    },
    submitButtonText:{
       color: 'white',
       width: 100,
       alignContent: 'center',
       justifyContent: 'center',
    },
    activitiesText:{
      textAlign: 'center',
    },
    titleText:{
      fontSize: 25,
      flex: 1,
      //color: 'green',
      fontStyle: 'italic',
      textAlign: 'center',
      textDecorationLine: 'underline',
      },
    headerText:{
      fontSize: 35,
      flex: .5,
      //color: 'green',
      textAlign: 'center',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      },
    centerText:{
      //fontSize: 35,
      //color: 'green',
      textAlign: 'center',
      //justifyContent: 'center',
      flex: 1,
      },
   surface: {
      padding: 0,
      height: 80,
      width: 200,
     // alignItems: 'center',
      //justifyContent: 'center',
      }});