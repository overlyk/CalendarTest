import { Modal, Portal, Text, TextInput } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { createGoal } from '../../api/logic/GoalLogic';
import { Goal } from '../../api/models/Goal';
import {useForm, Controller} from 'react-hook-form';
import GreenButton from '../GreenButton';
import { User } from '../../api/models/User';

export default function CreateGoalModal({handleModalClose, fetchGoals, isVisible, currentUser} : {handleModalClose: () => void; fetchGoals: () => void; isVisible: boolean; currentUser: User}) {
  const { control, handleSubmit, formState: { errors } } = useForm<Goal>();
  const onSubmit = async (data) => {
    const goal = 
      currentUser.isCoach && currentUser.TeamId ?
      {
        id: 0,
        userid: currentUser.id,
        name: data.name,
        description: data.description,
        isCompleted: false,
        teamid: data.teamid
      } : 
      {
        id: 0,
        userid: currentUser.id,
        name: data.name,
        description: data.description,
        isCompleted: false,
        teamid: 0
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
    textAlign: 'center',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  }
});