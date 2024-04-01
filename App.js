import BottomNavBar from './src/components/BottomNavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useState } from 'react';
import Login from './src/pages/Login';


//entry point of the application - equivalent to the main function
//calls AppBar which is bottom nav component responsible for keeping track of routing to different pages
//calls "login" component which user logs/in out
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  //if logged in, show bottomnavbar and route to main page - if not, show login page
  return (
    <SafeAreaProvider style={styles.container}>
        {loggedIn 
        ? 
        <BottomNavBar /> 
        : 
        <Login handleLogin={handleLogin}/>}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgreen',
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