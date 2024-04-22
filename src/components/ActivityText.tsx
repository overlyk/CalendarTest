import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { Activity } from '../api/models/Activity';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import { useState } from 'react';

export default function ActivityText({ activity } : { activity: Activity }) {

  return (
    <View>
      {activity ?      
        <View>  
        <Text style={styles.activitiesText}>Name: {activity.name}</Text>
        <Text style={styles.activitiesText}>Description: {activity.description}</Text>
        <Text style={styles.activitiesText}>Start Time: {activity.starttime ? format(new Date(activity.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
        <Text style={styles.activitiesText}>End Time: {activity.endtime ? format(new Date(activity.endtime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
        <Text style={styles.activitiesText}>Location: {activity.location}</Text>
        </View>
       :  <Text>There are no activities currently scheduled</Text>}
    </View> 
  );
};

const styles = StyleSheet.create({
    activitiesText:{
      textAlign: 'center',
    },
      });