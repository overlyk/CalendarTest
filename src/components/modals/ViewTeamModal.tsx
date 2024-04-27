//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput} from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet, FlatList } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { Team } from '../../api/models/Team';
import { useEffect, useState } from 'react';
import { User } from '../../api/models/User';
import { getAllUsers, updateUserTeam } from '../../api/logic/UserLogic';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ViewTeamModal({handleModalClose, team, isVisible, userId} : {handleModalClose: () => void; isVisible: boolean; team: Team, userId: number}) {
    const [players, setPlayers] = useState<User[]>([]);
    const [allUnassignedUsers, setAllUnassignedUsers] = useState<User[]>([]);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm<User>();
    const onSubmit = async (data) => {
      const user = {
        id: data.TeamId,
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        isCoach: false,
        TeamId: team.id
      }
      await updateUserTeam(user);
      setValue("TeamId", null);
      fetchPlayers();
      handleModalClose();
    };
    const fetchPlayers = async () => {
        const allUsers = await getAllUsers();
        if (allUsers) {
          const allCurrentUnassignedUsers = allUsers.filter(user => user.TeamId === 0);
          const filteredUsers = allUsers.filter(user => user.TeamId === team.id);
          setPlayers(filteredUsers);
          setAllUnassignedUsers(allCurrentUnassignedUsers);
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
         <Controller
              name="TeamId"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                  <SelectDropdown
                    data={allUnassignedUsers}
                    onSelect={(selectedItem, index) => {
                        onChange(selectedItem.id);
                    }}

                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {selectedItem ? `${selectedItem.firstname} ${selectedItem.lastname}` : 'Select Player'}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                          <Text style={styles.dropdownItemTxtStyle}>{`${item.firstname} ${item.lastname}`}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                )}
            />
            {errors.TeamId && <Text>Select a player to add them</Text>}
            <GreenButton onPress={handleSubmit(onSubmit)} text="Add Player"/>
         <GreenButton onPress={handleModalClose} text="Back"/>
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
        textAlign: 'center',
      },
      dropdownButtonStyle: {
        width: 350,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
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