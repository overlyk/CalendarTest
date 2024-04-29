import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, ActivityIndicator  } from 'react-native';
import { useState, useEffect } from 'react'
import { Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Goal } from '../api/models/Goal';
import { getAllGoals, deleteGoal, toggleGoalCompletion } from '../api/logic/GoalLogic';
import GreenButton from '../components/GreenButton';
import CreateGoalModal from '../components/modals/CreateGoalModal';
import { getAllTeams } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';

export default function Goals({currentUser} : {currentUser : User}) {
    const [teamGoals, setTeamGoals] = useState<Goal[]>([]);
    const [userGoals, setUserGoals] = useState<Goal[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTeam, setCurrentTeam] = useState({} as Team)
    const [isLoadingTeams, setIsLoadingTeams] = useState(true);
    const [isLoadingGoals, setIsLoadingGoals] = useState(true);

    const fetchTeams = async () => {
      const allTeams = await getAllTeams();
      if (allTeams) {
        const userTeam = allTeams.find(x => x.id === currentUser.TeamId);
        if (userTeam) {
          setCurrentTeam(userTeam);
        }
      }
      setIsLoadingTeams(false);
    };
    const openModal = () => {
      setModalVisible(true);
    };
    const closeModal = () => {
      setModalVisible(false);
    };
    const fetchGoals = async () => {
      const allGoals = await getAllGoals();
      if (allGoals) {
        const filteredTeamGoals = allGoals.filter(goal => goal.userid === currentUser.id || goal.teamid === currentUser.TeamId);
        setTeamGoals(filteredTeamGoals);
        const filteredUserGoals = allGoals.filter(goal => goal.userid === currentUser.id && goal.teamid === 0);
        setUserGoals(filteredUserGoals);
        setIsLoadingGoals(false);
      }
    };
    useEffect(() => {
      fetchGoals(); 
      fetchTeams();
    }, []);
    const deleteAndRefresh = async (id: number) => {
      await deleteGoal(id);
      fetchGoals();
    }
    const toggleCompleted = async (goal: Goal) => {
      await toggleGoalCompletion(goal);
      fetchGoals();
    }
    const toggleTeamGoalCompleted = async (goal: Goal) => {
      currentUser.isCoach ? await toggleGoalCompletion(goal) : null;
      fetchGoals();
    }

  return (
    <SafeAreaView style={styles.container2}>
        {isLoadingGoals || isLoadingTeams ? <ActivityIndicator size="large" color="green"/> : 
        <>
        <Text style={styles.bigHeader}>Goals</Text>
        <GreenButton text={currentUser.isCoach ? "Create Team Goal" : "Create Goal"} onPress={openModal}/>
        <CreateGoalModal handleModalClose={closeModal} fetchGoals={fetchGoals} isVisible={modalVisible} currentUser={currentUser}></CreateGoalModal>
        <ScrollView>
        {!currentUser.isCoach ? 
          <>
            <Text style={styles.header}>{`${currentUser.firstname}'s Goals`}</Text>
            {userGoals.length > 0 ?
              <FlatList
                style={{margin: 10}}
                scrollEnabled={false}
                data={userGoals}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.goalView} onPress={() => toggleCompleted(item)}>
                    <View style={{width: '50%'}}>
                      <Text style={styles.goalItem}>{item.name}</Text>
                      <Text style={styles.goalSubText}>{item.description}</Text>
                    </View>
                    <View style={{width: '50%', alignItems: 'flex-end' }}>
                      <Text style={[styles.goalItemRight, { color: item.isCompleted ? 'green' : 'red' }]}>
                        {item.isCompleted ? 'Complete' : 'In Progress'}
                      </Text>
                      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
                        <Text style={{color: 'white'}}>X</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>You haven't set any goals yet!</Text> }
          </>
          : null}

        {currentUser.TeamId ?
          <>
            <Text style={styles.header}>{`${currentTeam.name}'s Goals`}</Text>
            {teamGoals.length > 0 ?
              <FlatList
                style={{margin: 10}}
                scrollEnabled={false}
                data={teamGoals}
                renderItem={({ item }) => (
                <TouchableOpacity style={styles.goalView} onPress={() => toggleTeamGoalCompleted(item)}>
                  <View style={{width: '50%'}}>
                    <Text style={styles.goalItem}>{item.name}</Text>
                    <Text style={styles.goalSubText}>{item.description}</Text>
                  </View>
                  <View style={{width: '50%', alignItems: 'flex-end' }}>
                    <Text style={[styles.goalItemRight, { color: item.isCompleted ? 'green' : 'red' }]}>
                      {item.isCompleted ? 'Complete' : 'In Progress'}
                    </Text>
                    { currentUser.isCoach ? 
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
                      <Text style={{color: 'white'}}>X</Text>
                    </TouchableOpacity> : null }
                  </View>
                </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>Your team hasn't set any goals yet!</Text> }
            </> : null } 
         </ScrollView>
         </> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', 
  },
  container2: {
    paddingTop: 20,
    flex: 10,
    justifyContent: 'space-evenly',
    backgroundColor: '#f0f0f0', 
 },
  centerText: {
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    color: 'green', 
    textAlign: 'center',
  },
  bigHeader: {
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
  },
  goalItem: {
    fontSize: 16,
    color: 'green',
    textAlign: 'left',
  },
  goalItemRight: {
    fontSize: 16,
    color: 'red',
    textAlign: 'right',
  },
  goalSubText: {
    fontSize: 12,
    textAlign: 'left',
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});