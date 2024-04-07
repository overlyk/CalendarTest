//this is an example of using the API to fetch user data
//logic for the API call is in UserLogic, and the model is the User model

import React, { Component, useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import {variables} from '../common/Variables';
import { ActivityIndicator } from 'react-native-paper';
import { User } from '../api/models/User';
import { getUser } from '../api/logic/UserLogic';

export default function HttpExample() {
  const [user, setUser] = useState({} as User);
  const [isLoading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
      const userData = await getUser(1);
      if (userData) {
          setUser(userData);
          setLoading(false);
      }
      else {
        setLoading(true);
      }
  };
  fetchData();
}, []);

      return (
         <View>
         {isLoading ? (
           <ActivityIndicator />
         ) : (
            <View>
               <Text>
                  {user.firstname} {user.password} {user.id}
               </Text>
           {/* <FlatList
             data={userData}
             keyExtractor={({id}) => id}
             renderItem={({item}) => (
               <Text>
               Name: {item.Name}, Title: {item.Password}, Id: {item.id}
               </Text>
             )}
           /> */}
           </View>
         )}
       </View>
      )
}