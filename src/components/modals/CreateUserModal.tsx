import { Modal, Portal, Text, TextInput } from 'react-native-paper';
import { Button, View, StyleSheet } from 'react-native';
import { createUser } from '../../api/logic/UserLogic';
import { User } from '../../api/models/User';
import {useForm, Controller} from 'react-hook-form';
import { useState } from 'react';
export default function CreateUserModal({handleModalClose, handleCreateUser} : {handleCreateUser: (success: boolean) => void, handleModalClose: () => void}) {
  const containerStyle = {backgroundColor: 'white', padding: 0};
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<User>();
  const [isSubmitting, setIsSubmitting] = useState(false);
	const onSubmit = async (data) => {
    setValue("username", "");
    setValue("password", "");
    setValue("firstname", "");
    setValue("lastname", "");
      const user  = {
        id: 0,
        username: data.username,
        password: data.password,
        firstname: data.firstname,
        lastname: data.lastname,
        isCoach: false,
        TeamId: 0
      }
      if (isSubmitting) {
        return;
      }
      else {
        setIsSubmitting(true);
        const success = await createUser(user);
        handleCreateUser(success);
        setIsSubmitting(false);
      }
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

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstname"
            />
            {errors.firstname && <Text>This is required.</Text>}

            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastname"
            />
            {errors.lastname && <Text>This is required.</Text>}
            
         <Button title="Submit" onPress={handleSubmit(onSubmit)} />
         <Button title="Cancel" onPress={handleModalClose} />
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