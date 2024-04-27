
import { Appbar } from 'react-native-paper';
import UserMenu from './UserMenu';
export default function CustomAppBar({handleLogout} : {handleLogout:  () => void}) {
    return(
    <Appbar.Header style={{backgroundColor: '#12bc05'}}>
        <Appbar.Content title="Phoenix Fitness"/>
        <UserMenu handleLogout={handleLogout}/>
    </Appbar.Header>
    );
};