//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet, FlatList} from 'react-native';
import { createGoal } from '../api/logic/GoalLogic';
import { Goal } from '../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from './GreenButton';
import { Activity } from '../api/models/Activity';
import { User } from '../api/models/User';
import { deleteActivity } from '../api/logic/ActivityLogic';
import { format } from 'date-fns';
import { Team } from '../api/models/Team';

export default function ViewActivities({refetchActivities, activities, currentUser, currentTeam} : {refetchActivities: () => void; activities: Activity[]; currentUser: User; currentTeam: Team | undefined}) {
  const deleteAndRefresh = async (id: number) => {
    await deleteActivity(id);
    refetchActivities();
  }
  return (
    <View>
        {currentUser.TeamId ? 
          <>
            <Text style={styles.header}>{currentUser.TeamId ? `${currentTeam?.name}'s Activities` : null}</Text>
            <FlatList
              style={{margin: 10}}
              data={activities.filter(x => x.teamid == currentUser.TeamId)}
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
            /> 
          </> : null}

          {!currentUser.isCoach ? 
          <>
            <Text style={styles.header}>{`${currentUser.firstname}'s Activities`}</Text>
            <FlatList
              style={{margin: 10}}
              data={activities.filter(x => x.teamid === 0)}
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
          </>
          : null}     
    </View>
  );
};
const styles = StyleSheet.create({
      container: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
      deleteButton: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }
});