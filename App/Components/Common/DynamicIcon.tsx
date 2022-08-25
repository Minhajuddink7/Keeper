import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5Brands';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {commonData} from '../../Data/static/commonData';

type IconProps = {
  name?: string;
  family?: string;
  color?: string;
  size?: number;
  style?: any;
};
const {black} = commonData;
const DynamicIcon = ({name, family, color, size, style}: IconProps) => {
  const iconProps = {name, family, color: color || black, size, style};
  const defaultProps = {name: 'car', size, color: color || black, style};
  switch (family) {
    case 'FontAwesome':
      return <FontAwesome {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...iconProps} />;
    case 'Ionicons':
      return <Ionicons {...iconProps} />;
    case 'Entypo':
      return <Entypo {...iconProps} />;
    case 'Feather':
      return <Feather {...iconProps} />;
    case 'AntDesign':
      return <AntDesign {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcons {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...iconProps} />;

    case 'Foundation':
      return <Foundation {...iconProps} />;

    case 'Fontisto':
      return <Fontisto {...iconProps} />;

    case 'EvilIcons':
      return <EvilIcons {...iconProps} />;

    case 'Octicons':
      return <Octicons {...iconProps} />;

    case 'SimpleLineIcons':
      return <SimpleLineIcons {...iconProps} />;

    case 'Zocial':
      return <Zocial {...iconProps} />;

    default:
      return <FontAwesome {...defaultProps} />;
  }
};

export default DynamicIcon;
