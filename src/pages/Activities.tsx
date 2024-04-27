import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { Component, useCallback, useEffect, useState } from 'react'
import { Button, Divider, List, Surface, Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllGames } from '../api/logic/GameLogic';
import { format } from 'date-fns';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { getAllTeams } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';
import CreateActivityModal from '../components/modals/CreateActivityModal';
import GreenButton from '../components/GreenButton';
import ViewAllActivitiesModal from '../components/ViewActivities';

export default function Activities({currentUser} : {currentUser: User} ) {
  const [selected, setSelected] = useState('');
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [userGamesPerDay, setUserGamesPerDay] = useState<Game[]>([]);
  const [userActivitiesPerDay, setUserActivitiesPerDay] = useState<Activity[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [gameDayList, setGameDayList] = useState<string[]>([]);
  const [activityDayList, setActivityDayList] = useState<string[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const currentUserTeam = teamsList.find(team => team.id === currentUser.TeamId);
  let currentGames = {};
  let currentActivities = {};

  const fetchTeams = async () => {
    const allTeams = await getAllTeams();
    if (allTeams) {
      setTeamsList(allTeams);
    }
  };

  const fetchActivities = async () => {
    const allActivities = await getAllActivities();
    if (allActivities) {
      const filteredActivities = allActivities.filter(activity => activity.userid === currentUser.id || activity.teamid === currentUser.TeamId)
      setUserActivities(filteredActivities);
      const activityDays = filteredActivities.map(activity => format(new Date(activity.starttime), 'yyyy-MM-dd'));
      setActivityDayList(activityDays);
    }
  };
  const fetchGames = async () => {
    const allGames = await getAllGames();
    if (allGames) {
      const filteredGames = allGames.filter(game => (game.hometeamid == currentUser.TeamId) || (game.awayteamid == currentUser.TeamId));
      setUserGames(filteredGames);
      const gameDays = filteredGames.map(game => format(new Date(game.starttime), 'yyyy-MM-dd'));
      setGameDayList(gameDays);
    }
  };

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

  useEffect(() => {
    fetchActivities();
    fetchGames();
    fetchTeams();
  }, [])

  useEffect(() => {
    setUserGamesPerDay(userGames.filter(userGames => new Date(userGames.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(userGames.starttime).getMonth() == new Date(selected).getMonth() && new Date(userGames.starttime).getFullYear() == new Date(selected).getFullYear()))
    setUserActivitiesPerDay(userActivities.filter(activity => new Date(activity.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(activity.starttime).getMonth() == new Date(selected).getMonth() && new Date(activity.starttime).getFullYear() == new Date(selected).getFullYear()))
},[selected])
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Activities</Text>
        <GreenButton text={currentUser.isCoach ? "Create Team Activity" : "Create Activity"} onPress={() => setCreateModalVisible(true)}/>
        <CreateActivityModal handleModalClose={() => setCreateModalVisible(false)} fetchActivities={fetchActivities} isVisible={createModalVisible} user={currentUser}/>
        <ViewAllActivitiesModal refetchActivities={fetchActivities} activities={userActivities} currentUser={currentUser} currentTeam={currentUserTeam}/>
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
  goalView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerText:{
    textAlign: 'center',
    marginBottom: 10
  },
  goalItem: {
    fontSize: 16,
    marginHorizontal: 5,
    color: 'green', // Green goal text color
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
 surface: {
    padding: 0,
    height: 80,
    width: 200,
   // alignItems: 'center',
    //justifyContent: 'center',
    }});