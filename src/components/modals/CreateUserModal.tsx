//this is an example of a modal popup in react native
import * as React from 'react';
import { Modal, Portal, Text, PaperProvider, TextInput } from 'react-native-paper';
import { TouchableOpacity, Button, View, StyleSheet } from 'react-native';
import { createUser } from '../../api/logic/UserLogic';
import { User } from '../../api/models/User';
import {useForm, Controller} from 'react-hook-form';
export default function CreateUserModal({handleModalClose} : {handleModalClose: () => void}) {
  const containerStyle = {backgroundColor: 'white', padding: 0};
  const { control, handleSubmit, formState: { errors } } = useForm<User>();
	const onSubmit = (data) => {
        const user  = {
          id: 0,
          username: data.username,
          password: data.password,
          firstname: "test",
          lastname: "ing",
          isCoach: false,
          TeamId: 1
        }
      console.log('New User');
			createUser(user);
      handleModalClose();
	};
  return (
    <View>
      <Portal>
        <Modal visible={true} contentContainerStyle={containerStyle}>
          <Text style ={styles.titleText}>                NEW USER</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username && <Text>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
         <Button title="Submit" onPress={handleSubmit(onSubmit)} />
         <Button title="Cancel" onPress={handleModalClose} />
{/* <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            <TouchableOpacity style = {styles.submitButton} onPress = {handleSubmit}>
              <Text style = {styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.submitButton} onPress = {handleModalClose}>
              <Text style = {styles.submitButtonText}> Exit </Text>
            </TouchableOpacity> */}
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
     paddingTop: 220,
     alignContent: 'center',
  },
  
  input: {
     margin: 15,
     
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
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