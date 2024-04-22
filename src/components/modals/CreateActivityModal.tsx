//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { createActivity } from '../../api/logic/ActivityLogic';
import { Activity } from '../../api/models/Activity';
import { DatePickerInput } from 'react-native-paper-dates';
import { User } from '../../api/models/User';

export default function CreateActivityModal({handleModalClose, fetchActivities, isVisible, user} : {handleModalClose: () => void; fetchActivities: () => void; isVisible: boolean; user: User}) {
  const { control, handleSubmit, formState: { errors } } = useForm<Activity>();
	
  const onSubmit = async (data) => {
    const activity = user.isCoach && user.TeamId ? {
      id: 0,
      name: data.name,
      description: data.description,
      starttime: data.starttime,
      endtime: data.endtime,
      userid: user.id,
      teamid: user.TeamId,
      location: data.location
    } : {
      id: 0,
      name: data.name,
      description: data.description,
      starttime: data.starttime,
      endtime: data.endtime,
      userid: user.id,
      teamid: 0,
      location: data.location
    }
    console.log('New Activity');
	  await createActivity(activity);
    fetchActivities();
    handleModalClose();
  };

  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
          <Text style ={styles.titleText}>{user.isCoach ? 'NEW TEAM ACTIVITY' : 'NEW ACTIVITY'}</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Activity Name"
                  onBlur={onBlur}
                  onSelectionChange={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Activity Description"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && <Text>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Activity Location"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="location"
            />
            {errors.location && <Text>This is required.</Text>}

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