import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { Activity } from '../api/models/Activity';
import { View, StyleSheet } from 'react-native';
import { Game } from '../api/models/Game';

export default function GameText({ game } : { game: Game }) {
  const [text, setText] = React.useState("");

  return (
    <View>
        <Text style={styles.activitiesText}>Home Team: {game.hometeamid}</Text>
        <Text style={styles.activitiesText}>Away Team: {game.awayteamid}</Text>
        <Text style={styles.activitiesText}>Start Time: {new Date(game.starttime).getTime()}</Text>
        <Text style={styles.activitiesText}>End Time: {new Date(game.endtime).getTime()}</Text>
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
    },
    submitButtonText:{
       color: 'white',
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