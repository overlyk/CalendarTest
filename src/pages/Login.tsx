//this will be the initial Login page of the app
import React, { useEffect, useState } from 'react';

import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity  } from 'react-native';
import Inputs from '../components/Inputs';
import { getUser, createUser, getAllUsers, loginUser } from '../api/logic/UserLogic';
import { User } from '../api/models/User';
import { Surface, TextInput } from 'react-native-paper';

export default function Login( { handleLogin } : { handleLogin: (status: boolean) => boolean }) {
    const [currentUser, setUser] = useState({} as User);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [isLoading, setLoading] = useState(true);
   //  const allUsers  = getAllUsers();

   //  useEffect(() => {
   //    const fetchData = async () => {
   //        const userData = await getUser();
   //        if (userData) {
   //            setUser(userData);
   //            setLoading(false);
   //        }
   //        else {
   //          setLoading(true);
   //        }
   //    };
   //    fetchData();
   //  }, []);

    const authenticateUser = async () => {
      console.log(inputUsername, inputPassword);
      const user = await loginUser(inputUsername, inputPassword);
      console.log("user object returned as: " + user);
        if (user) 
        {
            console.log('Login successful');
            setUser(user);
            handleLogin(true);
        } else {
            console.log('Login failed');
            handleLogin(false);
        }
    };

    const handleCreateUser = () => {
      newUser({
         id: 0,
         username: inputUsername,
         password: inputPassword,
         firstname: '',
         lastname: '',
         isCoach: false,
         TeamId: 0
      });
   }
    const newUser = (user: User) => {
         console.log('New User');
         createUser(user);
         handleLogin(false);
    };

    return (
     <View style = {styles.container}>
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
                  onPress = {handleCreateUser}>
                  <Text style = {styles.submitButtonText}>                                       Sign Up </Text>
               </TouchableOpacity>

               </Surface>
    </View>
    );
}

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