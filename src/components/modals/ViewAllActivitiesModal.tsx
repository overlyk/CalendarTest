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

export default function ViewAllActivitiesModal({handleModalClose, refetchActivities, activities, isVisible, currentUser} : {handleModalClose: () => void; refetchActivities: () => void; activities: Activity[]; isVisible: boolean; currentUser: User}) {
  const deleteAndRefresh = async (id: number) => {
    await deleteActivity(id);
    refetchActivities();
  }
  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
        <Text style={styles.header}>{`${currentUser.firstname}'s Activities`}</Text>
      <FlatList
        style={{margin: 10}}
        data={activities}
        renderItem={({ item }) => (
          <View style={styles.goalView}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.goalItem}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <Text style={[styles.goalItem, { color: item.teamid ? 'green' : 'blue' }]}>
              {item.teamid ? 'Team Goal' : 'In Progress'}
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