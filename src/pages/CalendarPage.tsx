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
import ViewAllActivitiesModal from '../components/modals/ViewAllActivitiesModal';

export default function CalendarPage({currentUser} : {currentUser: User} ) {
  const [selected, setSelected] = useState('');
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [activityDateList, setActivityDateList] = useState<string[]>([]);
  const [gameDateList, setGameDateList] = useState<string[]>([]);
  const [currentDates, setCurrentDates] = useState({});
  const [hasGame, setHasGame] = useState([]);
  const currentUserTeam = teamsList.find(team => team.id === currentUser.TeamId);

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
      setActivityDateList(filteredActivities.map(activity => format(new Date(activity.starttime), 'yyyy-MM-dd')));
      console.log("activities: " + filteredActivities);
    }
  };
  const fetchGames = async () => {
    const allGames = await getAllGames();
    if (allGames) {
      const filteredGames = allGames.filter(game => (game.hometeamid == currentUser.TeamId) || (game.awayteamid == currentUser.TeamId));
      setUserGames(filteredGames);
      setGameDateList(filteredGames.map(game => format(new Date(game.starttime), 'yyyy-MM-dd')));
      console.log("games " + filteredGames);
      setCurrentDates(() => {
        let dates = {};
        activityDateList.forEach(date => {
          dates[date] = { marked: true, dotColor: 'blue' }
        });
        gameDateList.forEach(date => {
          dates[date] = { marked: true, dotColor: 'red' }
        });
        return dates;
      });
      console.log(currentDates.toString());
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchGames();
    fetchTeams();
  }, [])

  return (
    <View style={styles.container}>
       <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>{currentUser.isCoach ? `${currentUserTeam?.name}'s Calendar` : `${currentUser.firstname}'s Calendar`}</Text>
        <Text style={styles.header}>{`Today's Date: ${format(new Date(), 'MM/dd/yyyy')}`}</Text>
        <GreenButton text={currentUser.isCoach ? "Create Team Activity" : "Create Activity"} onPress={() => setCreateModalVisible(true)}/>
        <GreenButton text={currentUser.isCoach ? "View Team Activities" : "View Activities"} onPress={() => setViewModalVisible(true)}/>
        <ViewAllActivitiesModal handleModalClose={() => setViewModalVisible(false)} refetchActivities={fetchActivities} activities={userActivities} isVisible={viewModalVisible} currentUser={currentUser}/>
        <CreateActivityModal handleModalClose={() => setCreateModalVisible(false)} fetchActivities={fetchActivities} isVisible={createModalVisible} user={currentUser}/>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            currentDates,
            //['2024-04-17']: {marked: true, selectedColor: 'orange'},
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'}
          }}
        />
          <View>
            <Text style={styles.header}>Activities</Text>
            <View>
              <FlatList
                style={{margin: 10}}
                data={userActivities.filter(activity => new Date(activity.starttime).getDate() == new Date(selected).getDate() && new Date(activity.starttime).getMonth() == new Date(selected).getMonth() && new Date(activity.starttime).getFullYear() == new Date(selected).getFullYear())}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.goalView}>
                    <View>
                      <Text style={styles.goalItem}>{item.name}</Text>
                      <Text>{item.description}</Text>
                      <Text>Date: {format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy')}</Text>
                      <Text>Time: {format(new Date(item.starttime + 'Z'), 'hh:mm')}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
            </View>
            <Text style={styles.header}>Next Games In Schedule!</Text>
            <View>
              <FlatList
                style={{margin: 10}}
                data={userGames.filter(userGames => new Date(userGames.starttime).getDate() == new Date(selected).getDate() && new Date(userGames.starttime).getMonth() == new Date(selected).getMonth() && new Date(userGames.starttime).getFullYear() == new Date(selected).getFullYear())}
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
                      <Text>Date: {format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy')}</Text>
                      <Text>Time: {format(new Date(item.starttime + 'Z'), 'hh:mm')}</Text>
                      <Divider />
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
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
  goalView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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