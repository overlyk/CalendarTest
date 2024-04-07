//this will show team-related info that coaches and players can see
import React, { useEffect, useState } from 'react';

import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity  } from 'react-native';
import Inputs from '../components/Inputs';
import { getUser } from '../api/logic/UserLogic';
import { User } from '../api/models/User';
import { TextInput } from 'react-native-paper';

export default function Team({currentUser} : {currentUser: User} ) {

    return (
       <Text>team stuff here</Text>
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