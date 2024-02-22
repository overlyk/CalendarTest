import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SecondMenu from './SecondMenu';
import MainMenu from './MainMenu';
import { SafeAreaView } from 'react-native-safe-area-context';
const MusicRoute = () => <MainMenu />;

const AlbumsRoute = () => <SecondMenu />;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const MyAppBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'albums', title: 'Albums', focusedIcon: 'album' },
    { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />

  );
};

export default MyAppBar;