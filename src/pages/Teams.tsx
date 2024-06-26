import { FlatList, SafeAreaView, ScrollView, StyleSheet, View, ActivityIndicator, TouchableOpacity  } from 'react-native';
import {  useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { deleteGame, getAllGames } from '../api/logic/GameLogic';
import { getAllTeams, getTeam } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';
import GreenButton from '../components/GreenButton';
import { format } from 'date-fns';
import CreateGameModal from '../components/modals/CreateGameModal';
import ViewTeamModal from '../components/modals/ViewTeamModal';
export default function Teams({currentUser} : {currentUser: User} ) {
  const [teamActivities, setTeamActivities] = useState<Activity[]>([]);
  const [teamGames, setTeamGames] = useState<Game[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const currentUserTeam = teamsList.find(team => team.id === currentUser.TeamId);
  const [gameModalVisible, setGameModalVisible] = useState(false);
  const [teamModalVisible, setTeamModalVisible] = useState(false);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);

  const fetchTeams = async () => {
    const allTeams = await getAllTeams();
    if (allTeams) {
      setTeamsList(allTeams);
    }
    setIsLoadingTeams(false);
  };
  const fetchTeamActivities = async () => {
    const allActivities = await getAllActivities();
    if (allActivities) {
      const filteredActivities = allActivities
      .filter(activity => activity.teamid === currentUser.TeamId  && activity.teamid != 0 && new Date(activity.starttime) > new Date())
      .sort((a, b) => {
        // Convert start times to Date objects and subtract to get a numeric difference
        const startTimeA = new Date(a.starttime).getTime();
        const startTimeB = new Date(b.starttime).getTime();
        return startTimeA - startTimeB;
      });
    setTeamActivities(filteredActivities);
    }
    setIsLoadingActivities(false);
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
    setIsLoadingGames(false);
  };
  useEffect(() => {
    fetchTeamActivities();
    fetchTeamGames();
    fetchTeams();
  }, [])
  const deleteAndRefresh = async (id: number) => {
    await deleteGame(id);
    fetchTeamGames();
  }
  return (
    <SafeAreaView style={styles.container}>
        {!currentUser.TeamId ?
          <Text style={styles.centerText}>You currently have no team! Ask a coach to sign you up!</Text>
          : 
          (isLoadingActivities || isLoadingGames || isLoadingTeams) ? 
            <ActivityIndicator size="large" color="green"/> :
          <>
            <Text style={styles.header}>{currentUserTeam?.name} Homepage!</Text>
            <GreenButton text="View Team" onPress={() => setTeamModalVisible(!teamModalVisible)}/>
            {currentUser.isCoach ? <GreenButton text="Schedule New Game" onPress={() => setGameModalVisible(!gameModalVisible)}/> : null}
            {currentUser.isCoach ? <CreateGameModal handleModalClose={() => setGameModalVisible(!gameModalVisible)} teams={teamsList} fetchTeamGames={fetchTeamGames} isVisible={gameModalVisible} userId={currentUser.id}></CreateGameModal> : null}
            {currentUserTeam ? <ViewTeamModal handleModalClose={() => setTeamModalVisible(!teamModalVisible)} team={currentUserTeam} isVisible={teamModalVisible} currentUser={currentUser}></ViewTeamModal> : null}
            <ScrollView>
              <View>
                <Text style={styles.header}>Team Activities Up Next!</Text>
                <View>
                  <FlatList
                    style={{margin: 10}}
                    data={teamActivities}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <View style={styles.goalView}>
                        <View style={{width: '80%'}}>
                          <Text style={styles.goalItem}>{item.name}</Text>
                          <Text>{item.description}</Text>
                          <Text>Date: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
                          <Text>Time: {item.starttime ? format(new Date(item.starttime + 'Z'), 'hh:mm') : 'N/A'}</Text>
                        </View>
                      </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
                <Text style={styles.header}>Games Schedule</Text>
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
                        </View>
                        <View style={{width: '20%', alignItems: 'flex-end' }}>
                          {currentUser.isCoach ? 
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
                             <Text style={{color: 'white'}}>X</Text>
                            </TouchableOpacity> : null }
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

const styles = StyleSheet.create({
  container: {
     paddingTop: 20,
     flex: 10,
     justifyContent: 'space-evenly',
     backgroundColor: '#f0f0f0', 
  },
  scrollView: {
    backgroundColor: '#f0f0f0', 
    marginHorizontal: 5,
    },
    centerText: {
      textAlign: 'center',
    },
    deleteButton: {
      backgroundColor: 'red',
      width: 25,
      height: 25,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green', 
      textAlign: 'center',
    },
    goalView: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5,
      marginBottom: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    goalItem: {
      fontSize: 16,
      color: 'green',
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
});