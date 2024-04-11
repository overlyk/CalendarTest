import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { Activity } from '../api/models/Activity';
import { View, StyleSheet } from 'react-native';
import { Game } from '../api/models/Game';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getTeam } from '../api/logic/TeamLogic';

export default function GameText({ game } : { game: Game }) {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");

  useEffect(() => {
    const fetchHomeTeam = async () => {
      const hometeam = await getTeam(game.hometeamid);
      if (hometeam) {
        setHomeTeam(hometeam.name);
      }
    };
    const fetchAwayTeam = async () => {
      const awayteam = await getTeam(game.awayteamid);
      if (awayteam) {
        setAwayTeam(awayteam.name);
      }
    };
    fetchHomeTeam();
    fetchAwayTeam();
  }, [game.hometeamid, game.awayteamid])


  return (
    <View>
      {game ?      
        <View>  
        <Text style={styles.activitiesText}>Home Team: {homeTeam}</Text>
        <Text style={styles.activitiesText}>Away Team: {awayTeam}</Text>
        <Text style={styles.activitiesText}>Start Time: {game.starttime ? format(new Date(game.starttime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
        <Text style={styles.activitiesText}>End Time: {game.endtime ? format(new Date(game.endtime + 'Z'), 'MM/dd/yyyy') : 'N/A'}</Text>
        </View>
       :  <Text>There are no games currently scheduled</Text>}
    </View> 
  );
};

const styles = StyleSheet.create({
  activitiesText:{
    textAlign: 'center',
  },
    });