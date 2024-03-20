import React, { Component, useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import {variables} from './Variables';
import { ActivityIndicator } from 'react-native-paper';

type User = {
   Name: string;
   Password: string;
   id: number;
 };


export default function HttpExample() {

   const [userData, setData] = useState({} as User);
   const [isLoading, setLoading] = useState(true);

  const getUser = async () => {
   try {
      console.log('test');
     const response = await fetch(variables.API_URL+'/api/Users', {
      method: 'GET',
      headers: {
         Accept: 'application/json',
      'Content-type': 'application/json'
    },
   });
     console.log('response is: ', response);
     console.log('yay');
     const json = await response.json();
     console.log('json is: ', json);
     setData(json);
     console.log('after fetch user data is:', userData);
   } catch (error) {
      console.log(error);
     console.error('error happened: ', error);
   } finally {
     setLoading(false);
   }
 };
 useEffect(() => {
   setLoading(true);
   console.log('user data before is: ', userData);
   getUser();
   console.log('user data after issdfds: ', userData);
   setLoading(true);
 }, []);


      return (
         <View>
         {isLoading ? (
           <ActivityIndicator />
         ) : (
            <View>
               <Text>
                  {userData.Name} {userData.Password} {userData.id}
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