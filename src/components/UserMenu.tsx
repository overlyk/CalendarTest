import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';
import { Platform } from 'react-native';

export default function UserMenu({handleLogout} : {handleLogout: () => void}) {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
    const [visible, setVisible] = useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);

    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon={MORE_ICON}
            onPress={openMenu}
          ></IconButton>
        }
      >
        <Menu.Item onPress={handleLogout} title="Logout" />
      </Menu>
    );
  };