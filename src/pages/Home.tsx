import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import  { useEffect, useState } from 'react'
import { Text } from 'react-native-paper';
import { User } from '../api/models/User';
import { Game } from '../api/models/Game';
import { Activity } from '../api/models/Activity';
import { getAllActivities } from '../api/logic/ActivityLogic';
import { getAllGames } from '../api/logic/GameLogic';
import {Calendar } from 'react-native-calendars';
import { getAllTeams } from '../api/logic/TeamLogic';
import { Team } from '../api/models/Team';
import { format } from 'date-fns';

export default function Home({currentUser} : {currentUser: User} ) {
  const [nextGame, setNextGame] = useState({} as Game);
  const [nextActivity, setNextActivity] = useState({} as Activity);
  const [selected, setSelected] = useState('');
  const [currentTeam, setCurrentTeam] = useState({} as Team | undefined)
  const [teamsList, setTeamsList] = useState<Team[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [userGamesPerDay, setUserGamesPerDay] = useState<Game[]>([]);
  const [userActivitiesPerDay, setUserActivitiesPerDay] = useState<Activity[]>([]);
  const [gameDayList, setGameDayList] = useState<string[]>([]);
  const [activityDayList, setActivityDayList] = useState<string[]>([]);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  let currentGames = {};
  let currentActivities = {};

    const fetchTeams = async () => {
      const allTeams = await getAllTeams();
      if (allTeams) {
        setTeamsList(allTeams);
        setCurrentTeam(allTeams.find(x => x.id === currentUser.TeamId));
      }
      setIsLoadingTeams(false);
    };

    const fetchActivities = async () => {
      const allActivities = await getAllActivities();
      if (allActivities) {
        const filteredActivities = allActivities
        .filter(activity => activity.userid === currentUser.id || activity.teamid === currentUser.TeamId)
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });
        if (filteredActivities.length > 0) {
          setUserActivities(filteredActivities);
          const activityDays = filteredActivities.map(activity => format(new Date(activity.starttime), 'yyyy-MM-dd'));
          setActivityDayList(activityDays);
          setNextActivity(filteredActivities.filter(activity => format(new Date(activity.starttime), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))[0]);
      }
      }
      setIsLoadingActivities(false);
    };
    const fetchGames = async () => {
      const allGames = await getAllGames();
      if (allGames) {
        const filteredGames = allGames
        .filter(game => (game.hometeamid === currentUser.TeamId) || (game.awayteamid === currentUser.TeamId))
        .sort((a, b) => {
          // Convert start times to Date objects and subtract to get a numeric difference
          const startTimeA = new Date(a.starttime).getTime();
          const startTimeB = new Date(b.starttime).getTime();
          return startTimeA - startTimeB;
        });

        if (filteredGames.length > 0) {
          setUserGames(filteredGames);
          const gameDays = filteredGames.map(game => format(new Date(game.starttime), 'yyyy-MM-dd'));
          setGameDayList(gameDays);
          setNextGame(filteredGames.filter(game => format(new Date(game.starttime), 'yyyy-MM-dd') >= format(new Date(), 'yyyy-MM-dd'))[0]);
        }

      }
      setIsLoadingGames(false);
    };

  useEffect(() => {
    fetchActivities();
    fetchGames();
    fetchTeams();
  }, [])

  useEffect(() => {
    setUserGamesPerDay(userGames.filter(userGames => new Date(userGames.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(userGames.starttime).getMonth() == new Date(selected).getMonth() && new Date(userGames.starttime).getFullYear() == new Date(selected).getFullYear()))
    setUserActivitiesPerDay(userActivities.filter(activity => new Date(activity.starttime).getDate() - 1 == new Date(selected).getDate() && new Date(activity.starttime).getMonth() == new Date(selected).getMonth() && new Date(activity.starttime).getFullYear() == new Date(selected).getFullYear()))
},[selected])

  gameDayList.forEach((day) => {
    currentGames[day] = {
        selected: true,
        marked: true,
        selectedColor: 'purple'
    }});

  activityDayList.forEach((day) => {
    currentActivities[day] = {
        selected: true,
        marked: true,
        selectedColor: 'green'
    }});


  return (
    <View style={styles.container}>
      {isLoadingActivities || isLoadingTeams || isLoadingGames ? <ActivityIndicator size="large" color="green"/> :
      <ScrollView style={styles.scrollView}>
        <Text style ={styles.header}>Welcome, {currentUser.firstname}!</Text> 
        <Text style={styles.header2}>{`Today's Date: ${format(new Date(), 'MM/dd/yyyy')}`}</Text>

        <View style={styles.sectionView}>
          <Text style ={styles.header2}>Next Activity</Text> 
          <View style={styles.goalView2}>
           <View>
           {nextActivity.id != null  ? 
           <>
            <Text style={styles.goalItem}>Name: {nextActivity.name}</Text>
            <Text>Description: {nextActivity.description}</Text>
            <Text>Date: {nextActivity.starttime ? format(new Date(nextActivity.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
            <Text>Time: {nextActivity.starttime ? format(new Date(nextActivity.starttime + 'Z'), 'hh:mm'): null}</Text>
            </>
           : <Text style={styles.centerText}>No upcoming activities!</Text>}
            </View>
          </View>
        </View>

        <View style={styles.sectionView}>
        <Text style ={styles.header2}>Next Game</Text>
          <View style={styles.goalView2}>
            <View>
            {nextGame.id ? 
              <>
                <Text style={styles.goalItem}>
                HOME TEAM - {teamsList.find(team => team.id === nextGame.hometeamid)?.name}
                </Text>
                <Text style={styles.goalItem}>
                AWAY TEAM  - {teamsList.find(team => team.id === nextGame.awayteamid)?.name}
                </Text>
                <Text>Date: {nextGame.starttime ? format(new Date(nextGame.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
                <Text>Time: {nextGame.starttime ? format(new Date(nextGame.starttime + 'Z'), 'hh:mm') : null}</Text>
              </>
           : <Text style={styles.centerText}>No upcoming games!</Text>}
            </View>
          </View>
        </View>
        <Text style={styles.header}>{currentUser.isCoach ? `${currentTeam?.name}'s Calendar` : `${currentUser.firstname}'s Calendar`}</Text>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            ...currentGames,
            ...currentActivities,
            [selected]: {selected: true, disableTouchEvent: true, selectedColor: 'orange'},
          }}
        />
         <View>
            <Text style={styles.header}>Activities Today</Text>
            <View>
            {userActivitiesPerDay.length > 0 ?
              <FlatList
                style={{margin: 10}}
                data={userActivitiesPerDay}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.goalView}>
                    <View>
                      <Text style={styles.goalItem}>{item.name}</Text>
                      <Text>{item.description}</Text>
                      <Text>Date: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
                      <Text>Time: {item.starttime ? format(new Date(item.starttime + 'Z'), 'hh:mm'): null}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>No Activities Today</Text>}
            </View>
            <Text style={styles.header}>Games Today</Text>
            <View>
              {userGamesPerDay.length > 0 ? 
              <FlatList
                style={{margin: 10}}
                data={userGamesPerDay}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.goalView}>
                    <View>
                      <Text style={styles.goalItem}>
                      HOME TEAM - {teamsList.find(team => team.id === item.hometeamid)?.name}
                      </Text>
                      <Text style={styles.goalItem}>
                      AWAY TEAM  - {teamsList.find(team => team.id === item.awayteamid)?.name}
                      </Text>
                      <Text>Date: {item.starttime ? format(new Date(item.starttime + 'Z'), 'MM/dd/yyyy') : null}</Text>
                      <Text>Time: {item.starttime ? format(new Date(item.starttime + 'Z'), 'hh:mm') : null}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              /> : <Text style={styles.centerText}>No Games Today</Text>}
            </View>
          </View>
        </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     paddingTop: 20,
     flex: 10,
     justifyContent: 'space-evenly',
     backgroundColor: '#f0f0f0', // Light gray background
  },
  goalItem: {
    fontSize: 16,
    marginHorizontal: 5,
    color: 'green', 
  },
  goalView: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalView2: {
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  sectionView: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'green',
  },
  header2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    color: 'green', 
    textDecorationLine: 'underline'
  },
  scrollView: {
    backgroundColor: '#f0f0f0', // Light gray background
    marginHorizontal: 5,
  },
  centerText:{
    textAlign: 'center'
  },
});