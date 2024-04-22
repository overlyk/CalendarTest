//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { createGame } from '../../api/logic/GameLogic';
import { DatePickerInput } from 'react-native-paper-dates';
import { Game } from '../../api/models/Game';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Team } from '../../api/models/Team';

export default function CreateGameModal({handleModalClose, fetchTeamGames, teams, isVisible} : {handleModalClose: () => void; fetchTeamGames: () => void; teams: Team[], isVisible: boolean; userId: number}) {
  const { control, watch, handleSubmit, formState: { errors } } = useForm<Game>();
  const homeTeamId = watch('hometeamid');
  const awayTeamId = watch('awayteamid');


  const onSubmit = async (data) => {
    const game = {
        id: 0,
        hometeamid: data.hometeamid,
        awayteamid: data.awayteamid,
        starttime: data.starttime,
        endtime: data.endtime
    }
    console.log('New Game');
    console.log('game: ', game);
    console.log('data: ', data);
    await createGame(game);
    fetchTeamGames();
    handleModalClose();
  };

  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
          <Text style ={styles.titleText}>NEW GAME</Text>
            <Controller
              name="hometeamid"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                  <SelectDropdown
                    data={teams.filter(team => team.id !== awayTeamId)}
                    onSelect={(selectedItem, index) => {
                        onChange(selectedItem.id);
                    }}

                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.name) || 'Select Home Team'}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                          <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                )}
            />
            {errors.hometeamid && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (

                  <SelectDropdown
                    data={teams.filter(team => team.id !== homeTeamId)}
                    onSelect={(selectedItem, index) => {
                        onChange(selectedItem.id);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text style={styles.dropdownButtonTxtStyle}>
                            {(selectedItem && selectedItem.name) || 'Select Away Team'}
                          </Text>
                          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                      );
                    }}
                    renderItem={(item, index, isSelected) => {
                      return (
                        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                          <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                        </View>
                      );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                  />
                )}
                name="awayteamid"
            />
            {errors.awayteamid && <Text>This is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerInput
                locale="en"
                label="Start Date"
                value={value}
                onChange={onChange}
                inputMode="start"
                autoComplete="birthdate-full"
              />
              )}
              name="starttime"
            />
            {errors.starttime && <Text>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerInput
                locale="en"
                label="End Date"
                value={value}
                onChange={onChange}
                inputMode="start"
                autoComplete="birthdate-full"
              />
              )}
              name="endtime"
            />
            {errors.endtime && <Text>This is required.</Text>}
         <GreenButton onPress={handleSubmit(onSubmit)} text="Submit"/>
         <GreenButton onPress={handleModalClose} text="Cancel"/>
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
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
    container: {
      backgroundColor: 'white',
      padding: 10,
      margin: 10,
      borderRadius: 10,
      height: 500
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
      textAlign: 'center'
    },
    surface: {
      padding: 8,
      height: 80,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });