import { FlatList, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import React, { Component, useCallback, useEffect, useState } from 'react'
import { Button, Divider, List, Surface, Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllGames } from '../api/logic/GameLogic';
import { getAllTeams, getTeam } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';
import GreenButton from '../components/GreenButton';
import { format } from 'date-fns';

export default function Teams({currentUser} : {currentUser: User} ) {
  const [teamActivities, setTeamActivities] = useState<Activity[]>([]);
  const [teamGames, setTeamGames] = useState<Game[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const currentUserTeam = teamsList.find(team => team.id === currentUser.TeamId);

  const fetchTeams = async () => {
    const allTeams = await getAllTeams();
    if (allTeams) {
      setTeamsList(allTeams);
    }
  };
  
  const fetchTeamActivities = async () => {
    const allActivities = await getAllActivities();
    if (allActivities) {
      const filteredActivities = allActivities
      .filter(activity => activity.teamid === currentUser.TeamId  && new Date(activity.starttime) > new Date())
      .sort((a, b) => {
        // Convert start times to Date objects and subtract to get a numeric difference
        const startTimeA = new Date(a.starttime).getTime();
        const startTimeB = new Date(b.starttime).getTime();
        return startTimeA - startTimeB;
      });
    setTeamActivities(filteredActivities);
    }
  };
  const fetchTeamGames = async () => {
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
      setTeamGames(filteredGames);
    }
  };

  useEffect(() => {
    fetchTeamActivities();
    fetchTeamGames();
    fetchTeams();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        {!currentUser.TeamId ?
          <Text>You currently have no team! Ask a coach to sign you up!</Text>
          : 
          <>
            <Text style={styles.header}>{currentUserTeam?.name} Homepage!</Text>
            <GreenButton text="View Team" onPress={() => console.log("viewing team")}/>
            <ScrollView>
              <View>
                <Text style={styles.header}>Team Activities Coming Up!</Text>
                <View>
                  <FlatList
                    style={{margin: 10}}
                    data={teamActivities}
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
                    data={teamGames}
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
          </>
        }
  </SafeAreaView>
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
 accordianHeader: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#468021'
 },
 scrollView: {
  backgroundColor: '#f0f0f0', // Light gray background,
  marginHorizontal: 5,
},
  midContainer: {
    flex: .25,
    //alignContent: 'center',
    backgroundColor: '#6FCA35'
 },
 header: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'green', // Green header text color
  textAlign: 'center',
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
button: {
  backgroundColor: 'green',
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 6,
  elevation: 3, // for Android shadow
  shadowColor: '#000', // for iOS shadow
  shadowOffset: { width: 0, height: 2 }, // for iOS shadow
  shadowOpacity: 0.2, // for iOS shadow
  shadowRadius: 2, // for iOS shadow
},
buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
  textTransform: 'uppercase',
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