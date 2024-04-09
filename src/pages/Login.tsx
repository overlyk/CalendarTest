//this will be the initial Login page of the app
import React, { useEffect, useState } from 'react';

import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity  } from 'react-native';
import { getUser, createUser, getAllUsers, loginUser } from '../api/logic/UserLogic';
import { User } from '../api/models/User';
import { Surface, TextInput } from 'react-native-paper';
import CreateUserModal from '../components/modals/CreateUserModal';
export default function Login( { handleLogin } : { handleLogin: (user: User) => void}) {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    //function to handle logging in user
    const authenticateUser = async () => {
      console.log(inputUsername, inputPassword);
      const user = await loginUser(inputUsername, inputPassword); //calls API to see if user exists and authenticated
      console.log("user object returned as: " + user);
        if (user) 
        {
            console.log('Login successful');
            handleLogin(user);
        } else {
            console.log('Login failed');
        }
    };
    //this is what is displayed on the screen
    return (
     <View style = {styles.container}>
         {showLoginModal ? <CreateUserModal handleModalClose={() => setShowLoginModal(false)} /> : null}
         <Surface>
            <Text style ={styles.titleText}>       PHEONIX FITNESS</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {setInputUsername}/>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {setInputPassword}/>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {authenticateUser}>
               <Text style = {styles.submitButtonText}>                                        Login </Text>
            </TouchableOpacity>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => setShowLoginModal(true)}>
               <Text style = {styles.submitButtonText}>                                       Sign Up </Text>
            </TouchableOpacity>

            </Surface>
    </View>
    );
}
//use these to style the components (similar to CSS)
const styles = StyleSheet.create({
    container: {
       paddingTop: 220,
       alignContent: 'center',
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
    },
    submitButtonText:{
       color: 'white',
       alignContent: 'center',
       justifyContent: 'center',
    },
    titleText:{
      fontSize: 30,
      color: 'green',
      alignContent: 'center',
      justifyContent: 'center',
      },
   surface: {
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      }
 })