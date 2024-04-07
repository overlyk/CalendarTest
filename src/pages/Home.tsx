import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { Component, useCallback, useEffect, useState } from 'react'
import Inputs from '../components/Inputs';
import HttpExample from '../components/ApiExample';
import { Button, List, Surface, Text } from 'react-native-paper';
import MyTextBox from '../components/MyTextBox';
import MyAppBar from '../components/BottomNavBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { User } from '../api/models/User';
import { DatePickerModal } from 'react-native-paper-dates';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllGames } from '../api/logic/GameLogic';
import ActivityText from '../components/ActivityText';
import GameText from '../components/GameText';
import LogoutButton from '../components/LogoutButton';
export default function Home({currentUser, handleLogout} : {currentUser: User, handleLogout: () => void} ) {
  const [date, setDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [nextGame, setNextGame] = useState({} as Game);
  const [nextActivity, setNextActivity] = useState({} as Activity);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) {
        const filteredActivities = allActivities
        .filter(activity => activity.userid === currentUser.id)
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });
      setUserActivities(filteredActivities);
      // Set the next activity by taking the first element from the sorted array
      if (filteredActivities.length > 0) {
        setNextActivity(filteredActivities[0]);
      }
      }
    };
    const fetchGames = async () => {
      const allGames = await getAllGames();
      if (allGames) {
        const filteredGames = allGames.filter(game => (game.hometeamid || game.awayteamid) === currentUser.TeamId);
        setUserGames(filteredGames);
      }
    };
    fetchActivities();
    fetchGames();
  }, [currentUser.id])


  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

  return (
    <View style={styles.container}>
       <ScrollView style={styles.scrollView}>
        <Text style ={styles.headerText}>PHEONIX FITNESS</Text> 
          <LogoutButton handleLogout={handleLogout} />
            <Text style ={styles.titleText}>Welcome, {currentUser.username}!</Text> 
            <Text style ={styles.titleText}>Home Page Quick View</Text> 
            <List.Accordion title="Next Activity" id="1" style ={styles.accordianHeader}>
                <ActivityText activity={nextActivity}/>
            </List.Accordion>
            <List.Accordion title="Next Game" id="2" style ={styles.accordianHeader}>
                <GameText game={nextGame}/>
            </List.Accordion>
        <Text style ={styles.titleText}>Quick Calendar</Text> 
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
        <Text> DEBUG INFO: username: {currentUser.username}, id: {currentUser.id} </Text>
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
     backgroundColor: '#6FCA35'
  },
  topContainer: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#6FCA35'
 },
 accordianHeader: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#468021'
 },
 scrollView: {
  backgroundColor: '#6FCA35',
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