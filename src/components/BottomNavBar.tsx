//this is the bottom navigation bar that is displayed on the bottom of the screen
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SecondMenu from '../pages/Goals';
import MainMenu from '../pages/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from '../pages/Login';
import Goals from '../pages/Goals';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Team from '../pages/Team';
import { User } from '../api/models/User';

export default function BottomNavBar({currentUser} : {currentUser: User} ) {
  const [index, setIndex] = React.useState(0);
  const HomeRoute = () => <Home currentUser={currentUser}/>;
  const GoalsRoute = () => <Goals currentUser={currentUser}/>;
  const TeamRoute = () => <Team currentUser={currentUser}/>;
  const NotificationsRoute = () => <Calendar currentUser={currentUser}/>;

  const [routes] = React.useState([
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