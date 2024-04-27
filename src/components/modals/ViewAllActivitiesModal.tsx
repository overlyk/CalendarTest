//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet, FlatList } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { Activity } from '../../api/models/Activity';
import { User } from '../../api/models/User';
import { deleteActivity } from '../../api/logic/ActivityLogic';
import { format } from 'date-fns';
import { Team } from '../../api/models/Team';

export default function ViewAllActivitiesModal({handleModalClose, refetchActivities, activities, isVisible, currentUser, currentTeam} : {handleModalClose: () => void; refetchActivities: () => void; activities: Activity[]; isVisible: boolean; currentUser: User; currentTeam: Team | undefined}) {
  const deleteAndRefresh = async (id: number) => {
    await deleteActivity(id);
    refetchActivities();
  }
  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
        <Text style={styles.header}>{currentUser.isCoach ? `${currentTeam?.name}'s Activities` : `${currentUser.firstname}'s Activities`}</Text>
      <FlatList
        style={{margin: 10}}
        data={currentUser.isCoach ? activities.filter(x => x.teamid === currentUser.TeamId) : activities}
        renderItem={({ item }) => (
          <View style={styles.goalView}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.goalItem}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Start: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
              <Text>End: {item.endtime ? format(new Date(item.endtime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
            </View>
            <Text style={[styles.goalItem, { color: item.teamid ? 'green' : 'blue' }]}>
              {item.teamid ? 'Team Activity' : 'Your Activity'}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
              <Text style={{color: 'white'}}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
         <GreenButton onPress={handleModalClose} text="Cancel"/>
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0', // Light gray background
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'green', // Green header text color
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