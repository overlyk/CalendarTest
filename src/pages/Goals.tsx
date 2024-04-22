///this will show the Goals screen
//Split into Team Goals and User Goals

import { SafeAreaView, StyleSheet, View, FlatList, Modal, Button, TextInput, TouchableOpacity } from 'react-native';
import React, { Component, useState, useEffect } from 'react'
import { Surface, Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Goal } from '../api/models/Goal';
import { getAllGoals } from '../api/logic/GoalLogic';
import GreenButton from '../components/GreenButton';
import CreateGoalModal from '../components/modals/CreateGoalModal';
import { deleteGoal } from '../api/logic/GoalLogic';


export default function Goals({currentUser} : {currentUser : User}) {
    const [userGoals, setUserGoals] = useState<Goal[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
      setModalVisible(true);
    };

    const closeModal = () => {
      setModalVisible(false);
    };

    const fetchGoals = async () => {
      const allGoals = await getAllGoals();
      if (allGoals) {
        const filteredGoals = allGoals.filter(goal => goal.userid === currentUser.id);
        setUserGoals(filteredGoals);
      }
    };
    
    useEffect(() => {fetchGoals()}, []);

    const deleteAndRefresh = async (id: number) => {
      await deleteGoal(id);
      fetchGoals();
    }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{`${currentUser.firstname}'s Goals`}</Text>
      <GreenButton text="Create Goal" onPress={openModal}/>
      <CreateGoalModal handleModalClose={closeModal} fetchGoals={fetchGoals} isVisible={modalVisible} userId={currentUser.id}></CreateGoalModal>
      <FlatList
        style={{margin: 10}}
        data={userGoals}
        renderItem={({ item }) => (
          <View style={styles.goalView}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.goalItem}>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <Text style={[styles.goalItem, { color: item.isCompleted ? 'green' : 'red' }]}>
              {item.isCompleted ? 'Complete' : 'In Progress'}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteAndRefresh(item.id)}>
              <Text style={{color: 'white'}}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

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