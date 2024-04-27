import { useState } from 'react';
import { Menu, IconButton } from 'react-native-paper';

export default function UserMenu({handleLogout} : {handleLogout: () => void}) {
    const [visible, setVisible] = useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);


    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={openMenu}
          ></IconButton>
        }
      >
        <Menu.Item onPress={handleLogout} title="Logout" />
      </Menu>
    );
  };