//this is the bottom navigation bar that is displayed on the bottom of the screen
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SecondMenu from '../pages/Goals';
import MainMenu from '../pages/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from '../pages/Login';
import Goals from '../pages/Goals';
import Home from '../pages/Home';
import CalendarPage from '../pages/CalendarPage';
import Teams from '../pages/Teams';
import { User } from '../api/models/User';
import { useState } from 'react';

export default function BottomNavBar({currentUser, handleLogout} : {currentUser: User, handleLogout: () => void} ) {
  const [index, setIndex] = useState(0);
  const HomeRoute = () => <Home currentUser={currentUser} handleLogout = {handleLogout}/>;
  const GoalsRoute = () => <Goals currentUser={currentUser}/>;
  const TeamRoute = () => <Teams currentUser={currentUser}/>;
  const NotificationsRoute = () => <CalendarPage currentUser={currentUser}/>;

  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'goals', title: 'Goals', focusedIcon: 'album' },
    { key: 'team', title: 'Team', focusedIcon: 'history' },
    { key: 'calendar', title: 'Calendar', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    goals: GoalsRoute,
    team: TeamRoute,
    calendar: NotificationsRoute,
  });
  return (
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
  );
};