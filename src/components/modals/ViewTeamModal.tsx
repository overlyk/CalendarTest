//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet, FlatList } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { Team } from '../../api/models/Team';
import { useEffect, useState } from 'react';
import { User } from '../../api/models/User';
import { getAllUsers } from '../../api/logic/UserLogic';

export default function ViewTeamModal({handleModalClose, team, isVisible, userId} : {handleModalClose: () => void; isVisible: boolean; team: Team, userId: number}) {
    const [players, setPlayers] = useState<User[]>([]);
    const fetchPlayers = async () => {
        const allUsers = await getAllUsers();
        if (allUsers) {
          const filteredUsers = allUsers.filter(user => user.TeamId === team.id);
          setPlayers(filteredUsers);
        }
      };

      useEffect(() => {fetchPlayers()}, []);
  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
        <Text style={styles.header}>{`${team.name}'s Players!`}</Text>
        <FlatList
            style={{margin: 10}}
            data={players}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.goalView} onPress={() => console.log("goal pressed")}>
                    <View>
                        <Text style={styles.goalItem}>{item.firstname} {item.lastname}</Text>
                    </View>
                </TouchableOpacity>
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
  container: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  
  input: {
    height: 40,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  titleText:{
    fontSize: 30,
    color: 'green',
    alignContent: 'center',
    justifyContent: 'center',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  }
});