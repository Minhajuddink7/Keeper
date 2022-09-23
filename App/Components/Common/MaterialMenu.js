import React, {useState} from 'react';

import {View, Text, TouchableOpacity} from 'react-native';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import DynamicIcon from './DynamicIcon';

const MaterialMenu = ({children, visible, setVisible}) => {
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        visible={visible}
        anchor={
          // anchor || (
          <Text onPress={showMenu}>
            <DynamicIcon
              family="MaterialCommunityIcons"
              name="dots-vertical"
              size={25}
            />
          </Text>
          // )
        }
        onRequestClose={hideMenu}>
        {children}
        {/* <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem> */}
        {/* <MenuItem disabled>Disabled item</MenuItem> */}
        {/* <MenuDivider /> */}
        {/* <MenuItem onPress={hideMenu}>Menu item 4</MenuItem> */}
      </Menu>
    </View>
  );
};

export default MaterialMenu;
