import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import UserMenu from './UserMenu';
export default function CustomAppBar({handleLogout} : {handleLogout:  () => void}) {
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
    const [userMenu, setUserMenu] = useState(false);

    const handleOpenMenu = () => {
    setUserMenu(!userMenu);
}
    return(
    <Appbar.Header style={styles.container}>
        <Appbar.Content title="Phoenix Fitness"/>
        <UserMenu handleLogout={handleLogout}/>
    </Appbar.Header>
    );
};
const styles = StyleSheet.create({
container: {
    backgroundColor: '#12bc05'
 },
});