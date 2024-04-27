import { BottomNavigation } from 'react-native-paper';
import Goals from '../pages/Goals';
import Home from '../pages/Home';
import Activities from '../pages/Activities';
import Teams from '../pages/Teams';
import { User } from '../api/models/User';
import { useState } from 'react';

export default function BottomNavBar({currentUser} : {currentUser: User} ) {
  const [index, setIndex] = useState(0);
  const HomeRoute = () => <Home currentUser={currentUser}/>;
  const GoalsRoute = () => <Goals currentUser={currentUser}/>;
  const TeamRoute = () => <Teams currentUser={currentUser}/>;
  const NotificationsRoute = () => <Activities currentUser={currentUser}/>;
  const [routes] = useState([
    { key: 'home', title: 'Home', focusedIcon: 'home'},
    { key: 'goals', title: 'Goals', focusedIcon: 'ballot' },
    { key: 'team', title: 'Team', focusedIcon: 'account-box-multiple' },
    { key: 'calendar', title: 'Activities', focusedIcon: 'calendar' },
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