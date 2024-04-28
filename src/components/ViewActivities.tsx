import {  Text } from 'react-native-paper';
import { TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import { Activity } from '../api/models/Activity';
import { User } from '../api/models/User';
import { deleteActivity } from '../api/logic/ActivityLogic';
import { format } from 'date-fns';
import { Team } from '../api/models/Team';
import { useEffect, useState } from 'react';

export default function ViewActivities({refetchActivities, activities, currentUser, currentTeam} : {refetchActivities: () => void; activities: Activity[]; currentUser: User; currentTeam: Team | undefined}) {
  const [userActivities, setUserActivities] = useState(activities.filter(x => x.teamid === 0));
  const [teamActivities, setTeamActivities]= useState(activities.filter(x => x.teamid === currentUser.TeamId));
  
  const deleteAndRefresh = async (id: number) => {
    await deleteActivity(id);
    refetchActivities();
  }
  useEffect(() => {
    setUserActivities(activities.filter(x => x.teamid === 0));
    setTeamActivities(activities.filter(x => x.teamid === currentUser.TeamId));
  },[activities])

  return (
    <View>
        {currentUser.TeamId ? 
        <>
        <Text style={styles.header}>{currentUser.TeamId ? `${currentTeam?.name}'s Activities` : null}</Text>
        {teamActivities.length > 0 ?
            <FlatList
              style={{margin: 10}}
              data={teamActivities}
              renderItem={({ item }) => (
                <View style={styles.goalView}>
                  <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.goalItem}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>Start: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
                    <Text>End: {item.endtime ? format(new Date(item.endtime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
                  </View>
                  {currentUser.isCoach ?
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
                      <Text style={{color: 'white'}}>X</Text>
                    </TouchableOpacity>
                    : null }
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            /> : <Text style={styles.centerText}>Your team hasn't set any goals yet!</Text>}
        </> : null }
        {!currentUser.isCoach ? 
        <>
          <Text style={styles.header}>{`${currentUser.firstname}'s Activities`}</Text>
          {userActivities.length > 0 ?
          <FlatList
            style={{margin: 10}}
            data={userActivities}
            renderItem={({ item }) => (
              <View style={styles.goalView}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={styles.goalItem}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>Start: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
                  <Text>End: {item.endtime ? format(new Date(item.endtime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
                  <Text style={{color: 'white'}}>X</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          /> 
         : <Text style={styles.centerText}>You haven't set any activities yet!</Text> }
       </> : null}     
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green',
    textAlign: 'center',
  },
  centerText: {
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
    color: 'green', 
  },
  deleteButton: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});