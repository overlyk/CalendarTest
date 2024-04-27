import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
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
import { format } from 'date-fns';

export default function Home({currentUser} : {currentUser: User} ) {
  const [nextGame, setNextGame] = useState({} as Game);
  const [nextActivity, setNextActivity] = useState({} as Activity);
  const [selected, setSelected] = useState('');
  const [currentTeam, setCurrentTeam] = useState({} as Team | undefined)
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [userGamesPerDay, setUserGamesPerDay] = useState<Game[]>([]);
  const [userActivitiesPerDay, setUserActivitiesPerDay] = useState<Activity[]>([]);
  const [gameDayList, setGameDayList] = useState<string[]>([]);
  const [activityDayList, setActivityDayList] = useState<string[]>([]);

  let currentGames = {};
  let currentActivities = {};

    const fetchTeams = async () => {
      const allTeams = await getAllTeams();
      if (allTeams) {
        setTeamsList(allTeams);
        setCurrentTeam(allTeams.find(x => x.id === currentUser.TeamId));
      }
    };

    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) {
        const filteredActivities = allActivities
        .filter(activity => activity.userid === currentUser.id || activity.teamid === currentUser.TeamId)
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });

        setUserActivities(filteredActivities);
        const activityDays = filteredActivities.map(activity => format(new Date(activity.starttime), 'yyyy-MM-dd'));
        setActivityDayList(activityDays);

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
        .filter(game => (game.hometeamid == currentUser.TeamId) || (game.awayteamid == currentUser.TeamId))
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });
        setUserGames(filteredGames);
        const gameDays = filteredGames.map(game => format(new Date(game.starttime), 'yyyy-MM-dd'));
        setGameDayList(gameDays);
        if (filteredGames.length > 0) {
          setNextGame(filteredGames[0]);
        }
      }
    };

  useEffect(() => {
    fetchActivities();
    fetchGames();
    fetchTeams();
  }, [])

  useEffect(() => {
    setUserGamesPerDay(userGames.filter(userGames => new Date(userGames.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(userGames.starttime).getMonth() == new Date(selected).getMonth() && new Date(userGames.starttime).getFullYear() == new Date(selected).getFullYear()))
    setUserActivitiesPerDay(userActivities.filter(activity => new Date(activity.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(activity.starttime).getMonth() == new Date(selected).getMonth() && new Date(activity.starttime).getFullYear() == new Date(selected).getFullYear()))
},[selected])

  gameDayList.forEach((day) => {
    currentGames[day] = {
        selected: true,
        marked: true,
        selectedColor: 'purple'
    }});

  activityDayList.forEach((day) => {
    currentActivities[day] = {
        selected: true,
        marked: true,
        selectedColor: 'green'
    }});


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style ={styles.header}>Welcome, {currentUser.firstname}!</Text> 
        <Text style={styles.header2}>{`Today's Date: ${format(new Date(), 'MM/dd/yyyy')}`}</Text>

        <View style={styles.sectionView}>
          <Text style ={styles.header2}>Next Activity</Text> 
          <View style={styles.goalView2}>
           <View>
            <Text style={styles.goalItem}>Name: {nextActivity.name}</Text>
            <Text>Description: {nextActivity.description}</Text>
            <Text>Date: {nextActivity.starttime ? format(new Date(nextActivity.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
            <Text>Time: {nextActivity.starttime ? format(new Date(nextActivity.starttime + 'Z'), 'hh:mm'): null}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionView}>
        <Text style ={styles.header2}>Next Game</Text>
          <View style={styles.goalView2}>
            <View>
              <Text style={styles.goalItem}>
              HOME TEAM - {teamsList.find(team => team.id === nextGame.hometeamid)?.name}
              </Text>
              <Text style={styles.goalItem}>
              AWAY TEAM  - {teamsList.find(team => team.id === nextGame.awayteamid)?.name}
              </Text>
              <Text>Date: {nextGame.starttime ? format(new Date(nextGame.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
              <Text>Time: {nextGame.starttime ? format(new Date(nextGame.starttime + 'Z'), 'hh:mm') : null}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.header}>{currentUser.isCoach ? `${currentTeam?.name}'s Calendar` : `${currentUser.firstname}'s Calendar`}</Text>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            ...currentGames,
            ...currentActivities,
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
          }}
        />
         <View>
            <Text style={styles.header}>Activities Today</Text>
            <View>
            {userActivitiesPerDay.length > 0 ?
              <FlatList
                style={{margin: 10}}
                data={userActivitiesPerDay}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.goalView}>
                    <View>
                      <Text style={styles.goalItem}>{item.name}</Text>
                      <Text>{item.description}</Text>
                      <Text>Date: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
                      <Text>Time: {item.starttime ? format(new Date(item.starttime + 'Z'), 'hh:mm'): null}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>No Activities Today</Text>}
            </View>
            <Text style={styles.header}>Games Today</Text>
            <View>
              {userGamesPerDay.length > 0 ? 
              <FlatList
                style={{margin: 10}}
                data={userGamesPerDay}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.goalView}>
                    <View>
                      <Text style={styles.goalItem}>
                      HOME TEAM - {teamsList.find(team => team.id === item.hometeamid)?.name}
                      </Text>
                      <Text style={styles.goalItem}>
                      AWAY TEAM  - {teamsList.find(team => team.id === item.awayteamid)?.name}
                      </Text>
                      <Text>Date: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
                      <Text>Time: {item.starttime ? format(new Date(item.starttime + 'Z'), 'hh:mm') : null}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>No Games Today</Text>}
            </View>
          </View>
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
  goalItem: {
    fontSize: 16,
    marginHorizontal: 5,
    color: 'green', // Green goal text color
  },
  goalView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalView2: {
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  sectionView: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
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
  textAlign: 'center',
  color: 'green', // Green header text color
},
header2: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 2,
  textAlign: 'center',
  color: 'green', // Green header text color
  textDecorationLine: 'underline'
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
    textAlign: 'center'
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