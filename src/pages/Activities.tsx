import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllTeams } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';
import CreateActivityModal from '../components/modals/CreateActivityModal';
import GreenButton from '../components/GreenButton';
import ViewAllActivitiesModal from '../components/ViewActivities';

export default function Activities({currentUser} : {currentUser: User} ) {
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const currentUserTeam = teamsList.find(team => team.id === currentUser.TeamId);
  const fetchTeams = async () => {
    const allTeams = await getAllTeams();
    if (allTeams) {
      setTeamsList(allTeams);
    }
    setIsLoadingTeams(false);
  };
  const fetchActivities = async () => {
    const allActivities = await getAllActivities();
    if (allActivities) {
      const filteredActivities = allActivities.filter(activity => activity.userid === currentUser.id || activity.teamid === currentUser.TeamId);
      setUserActivities(filteredActivities);
    }
    setIsLoadingActivities(false);
  };
  useEffect(() => {
    fetchActivities();
    fetchTeams();
  }, [])
  return (
    <View style={styles.container}>
      {isLoadingActivities || isLoadingTeams ? <ActivityIndicator size="large" color="green"/> :
      <>
        <Text style={styles.header}>Activities</Text>
        <GreenButton text={currentUser.isCoach ? "Create Team Activity" : "Create Activity"} onPress={() => setCreateModalVisible(true)}/>
        <ScrollView style={styles.scrollView}>
          <CreateActivityModal handleModalClose={() => setCreateModalVisible(false)} fetchActivities={fetchActivities} isVisible={createModalVisible} user={currentUser}/>
          <ViewAllActivitiesModal refetchActivities={fetchActivities} activities={userActivities} currentUser={currentUser} currentTeam={currentUserTeam}/>
        </ScrollView>
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 20,
     flex: 10,
     justifyContent: 'space-evenly',
     backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green',
  },
  scrollView: {
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
},
});