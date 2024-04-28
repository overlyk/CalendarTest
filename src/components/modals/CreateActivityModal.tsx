//this is an example of a modal popup in react native
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { createActivity, updateActivity } from '../../api/logic/ActivityLogic';
import { Activity } from '../../api/models/Activity';
import { DatePickerInput } from 'react-native-paper-dates';
import { User } from '../../api/models/User';
import { useEffect, useState } from 'react';

export default function CreateActivityModal({handleModalClose, fetchActivities, isVisible, user, activityToEdit} : {handleModalClose: () => void; fetchActivities: () => void; isVisible: boolean; user: User; activityToEdit?: Activity}) {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<Activity>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
    setValue("name", "");
    setValue("description", "");
    setValue("location", "");
    setValue("starttime", new Date());
    setValue("endtime", new Date());
    
    const activity = activityToEdit ? {
      id: activityToEdit.id,
      name: data.name,
      description: data.description,
      starttime: data.starttime,
      endtime: data.endtime,
      userid: activityToEdit.id,
      teamid: activityToEdit.teamid,
      location: data.location
    } : user.isCoach && user.TeamId ? {
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
      if (isSubmitting)
      {
        return;
      }
      else
      {
        setIsSubmitting(true);
        if (activityToEdit)
        {
          await updateActivity(activity);
          setIsSubmitting(false);
        }
        else
        {
          await createActivity(activity);
          setIsSubmitting(false);
        }
      }
    fetchActivities();
    handleModalClose();
  };

  useEffect(() => {
    if (activityToEdit != null)
    {
      setValue("name", activityToEdit.name)
      setValue("description", activityToEdit.description)
      setValue("location", activityToEdit.location)
      setValue("starttime", activityToEdit.starttime)
      setValue("endtime", activityToEdit.endtime)
    }
  },[]);

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
                  onChangeText={onChange}
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