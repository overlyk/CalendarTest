import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { Component, useCallback, useEffect, useState } from 'react'
import { Button, List, Surface, Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllGames } from '../api/logic/GameLogic';
import ActivityText from '../components/ActivityText';
import GameText from '../components/GameText';
import LogoutButton from '../components/LogoutButton';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { getAllTeams } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';

export default function Home({currentUser} : {currentUser: User} ) {
  const [nextGame, setNextGame] = useState({} as Game);
  const [nextActivity, setNextActivity] = useState({} as Activity);
  const [selected, setSelected] = useState('');
  const [currentTeam, setCurrentTeam] = useState({} as Team)
  useEffect(() => {
    const fetchTeams = async () => {
      const allTeams = await getAllTeams();
      if (allTeams) {
        const userTeam = allTeams.find(x => x.id === currentUser.TeamId);
        if (userTeam) {
          setCurrentTeam(userTeam);
        }
      }
    };
    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) {
        const filteredActivities = allActivities
        .filter(activity => activity.userid === currentUser.id  && new Date(activity.starttime) > new Date())
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });
      // Set the next activity by taking the first element from the sorted array
      if (filteredActivities.length > 0) {
        setNextActivity(filteredActivities[0]);
      }
      }
    };
    const fetchGames = async () => {
      const allGames = await getAllGames();
      if (allGames) {
        const filteredGames = allGames
        .filter(game => (game.hometeamid == currentUser.TeamId) || (game.awayteamid == currentUser.TeamId) && new Date(game.starttime) > new Date())
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });
        if (filteredGames.length > 0) {
          setNextGame(filteredGames[0]);
        }
      }
    };
    fetchActivities();
    fetchGames();
  }, [currentUser.id])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style ={styles.header}>Home</Text> 
        <Text style ={styles.titleText}>Welcome, {currentUser.firstname}!</Text> 
        <List.Accordion title="Next Activity" id="1" style ={styles.accordianHeader}>
            <ActivityText activity={nextActivity}/>
        </List.Accordion>
        <List.Accordion title="Next Game" id="2" style ={styles.accordianHeader}>
            <GameText game={nextGame}/>
        </List.Accordion>
        <Text style ={styles.titleText}>Schedule at a Glance</Text> 
        <Calendar
        onDayPress={day => {
        setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
        }}
        />
      </ScrollView>
    </View>
  );
}
//use these to style the components (similar to CSS)
const styles = StyleSheet.create({
  container: {
     paddingTop: 20,
     flex: 10,
     justifyContent: 'space-evenly',
     //alignContent: 'center',
     backgroundColor: '#f0f0f0', // Light gray background
  },
  topContainer: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#6FCA35'
 },
 header: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 5,
  marginTop: -5,
  textAlign: 'center',
  color: 'green', // Green header text color
},
 accordianHeader: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#468021'
 },
 scrollView: {
  backgroundColor: '#f0f0f0', // Light gray background
  marginHorizontal: 5,
},
  midContainer: {
    flex: .25,
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
  debugText:{
    color: 'white',
    alignContent: 'center',
    justifyContent: 'center',
 },
  activityText:{
    fontSize: 14,
    color: 'blue',
   // textAlign: 'center',
  },
  titleText:{
    fontSize: 25,
    flex: 1,
    //color: 'green',
    fontStyle: 'italic',
   // textAlign: 'center',
    textDecorationLine: 'underline',
    },
  headerText:{
    fontSize: 35,
    flex: .5,
    //color: 'green',
   // textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    },
  centerText:{
    //fontSize: 35,
    //color: 'green',
   // textAlign: 'center',
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
const background = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#6FCA35',
}
});
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