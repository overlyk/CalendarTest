import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { Platform } from 'react-native';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useState } from 'react';
export default function CustomAppBar() {
    const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
    const [userMenu, setUserMenu] = useState(false);

    const handleOpenMenu = () => {
    setUserMenu(!userMenu);
}
    return(
    <Appbar.Header style={styles.container}>
        <Appbar.Content title="Pheonix Fitness"/>
        {/* <Appbar.BackAction onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        <Appbar.Action icon={MORE_ICON} onPress={handleOpenMenu} />
    </Appbar.Header>
    );
};
const styles = StyleSheet.create({
container: {
    //alignContent: 'center',
    backgroundColor: '#12bc05'
 },
});