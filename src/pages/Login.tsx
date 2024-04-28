import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { loginUser } from '../api/logic/UserLogic';
import { User } from '../api/models/User';
import { Surface, TextInput } from 'react-native-paper';
import CreateUserModal from '../components/modals/CreateUserModal';
export default function Login( { handleLogin } : { handleLogin: (user: User) => void}) {
    const [showCreateUserModal, setCreateUserModal] = useState(false);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const authenticateUser = async () => {
      const user = await loginUser(inputUsername, inputPassword);
        if (user) 
        {
            handleLogin(user);
            setLoginError('');
        } else {
            setToastMessage('');
            setLoginError('Invalid username or password');
        }
    };
    const handleCreateUser = async (success: boolean) => {
         if (success) {
            setToastMessage('User created successfully');
            setLoginError('');
            setCreateUserModal(false);
         }
         else {
            setLoginError('Error creating user');
            setCreateUserModal(false);
         }
    }

    return (
     <View style = {styles.container}>
         {showCreateUserModal ? <CreateUserModal handleCreateUser={handleCreateUser} handleModalClose={() => setCreateUserModal(false)} /> : null}
         <Surface>
            <Text style ={styles.titleText}>PHEONIX FITNESS</Text>
            {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
            {toastMessage ? <Text style={styles.toastText}>{toastMessage}</Text> : null}
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username"
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
               <Text style = {styles.submitButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {() => setCreateUserModal(true)}>
               <Text style = {styles.submitButtonText}>Sign Up</Text>
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
    centerText: {
      textAlign: 'center',
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
       textAlign: 'center',
    },
    titleText:{
      fontSize: 30,
      color: 'green',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      },
   surface: {
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
      },
   errorText:{
      fontSize: 14,
      color: 'red',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      },
   toastText:{
      fontSize: 14,
      color: 'green',
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      },
 })