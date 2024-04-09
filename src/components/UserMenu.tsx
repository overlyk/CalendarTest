import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider, IconButton } from 'react-native-paper';

export default function UserMenu(props) {
    const [visible, setVisible] = useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);
    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            {...props}
            icon="dots-vertical"
            onPress={openMenu}
          ></IconButton>
        }
      >
        <Menu.Item onPress={() => {}} title="asdf" />
        <Menu.Item onPress={() => {}} title="Sfdsa" />
      </Menu>
    );
  };