import {Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function LogoutButton({ handleLogout } : { handleLogout: () => void}) {
  return (
    <View>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress = {handleLogout}>
            <Text style = {styles.submitButtonText}>Logout</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
      backgroundColor: 'green',
      padding: 10,
      margin: 15,
      height: 40,
      width: 100,
  },
  submitButtonText:{
      color: 'white',
      width: 100,
      alignContent: 'center',
      justifyContent: 'center',
  },
});