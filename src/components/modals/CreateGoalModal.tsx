import { Modal, Portal, Text, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { User } from '../../api/models/User';
import { useState } from 'react';

export default function CreateGoalModal({handleModalClose, fetchGoals, isVisible, currentUser} : {handleModalClose: () => void; fetchGoals: () => void; isVisible: boolean; currentUser: User}) {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<Goal>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
    setValue("name", "");
    setValue("description", "");
    setValue("isCompleted", false);
    setValue("teamid", currentUser.TeamId ? currentUser.TeamId : 0);
    const goal = currentUser.isCoach && currentUser.TeamId ? {
        id: 0,
        userid: currentUser.id,
        name: data.name,
        description: data.description,
        isCompleted: false,
        teamid: data.teamid
      } : {
        id: 0,
        userid: currentUser.id,
        name: data.name,
        description: data.description,
        isCompleted: false,
        teamid: 0
      }
      if (isSubmitting) {
        return;
      }
      else {
        setIsSubmitting(true);
        await createGoal(goal);
        setIsSubmitting(false);
      }
	  await createGoal(goal);
    fetchGoals();
    handleModalClose();
  };

  return (
    <View>
      <Portal>
        <Modal visible={isVisible} contentContainerStyle={styles.container}>
          <Text style ={styles.titleText}>NEW GOAL</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Goal Name"
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
                  placeholder="Description"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && <Text>This is required.</Text>}
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
  titleText:{
    fontSize: 30,
    color: 'green',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});