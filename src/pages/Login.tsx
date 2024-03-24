//this will be the initial Login page of the app
import React, { useEffect, useState } from 'react';

import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity  } from 'react-native';
import Inputs from '../components/Inputs';
import { getUser } from '../api/logic/UserLogic';
import { User } from '../api/models/User';
import { TextInput } from 'react-native-paper';

export default function Login( { handleLogin } : { handleLogin: (status: boolean) => boolean }) {
    const [user, setUser] = useState({} as User);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
          const userData = await getUser();
          if (userData) {
              setUser(userData);
              setLoading(false);
          }
          else {
            setLoading(true);
          }
      };
      fetchData();
    }, []);

    const authenticateUser = () => {
        if (user.Name === inputUsername && user.Password === inputPassword) 
        {
            console.log('Login successful');
            handleLogin(true);
        } else {
            console.log('Login failed');
            handleLogin(false);
        }
    };

    return (
     <View style = {styles.container}>
                <Text>Login Page</Text>
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
                 <Text style = {styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 })