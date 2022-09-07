import {Text} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
type AppTextProps = {
  text: string;
  type?: string;
  mr?: number;
  ml?: number;
  ta?: string;
};

const AppText = ({text, type, mr, ml, ta}: AppTextProps) => {
  const styleArr = type?.split(/[,]/);
  let textStyle: any = {
    fontFamily: styleArr?.[0] || 'Montserrat-Regular',
    color: styleArr?.[1] || commonData.colors.BLACK_COLOR,
    fontSize: styleArr?.[2] ? JSON.parse(styleArr[2]) : 14,
    marginLeft: ml || 0,
    marginRight: mr || 0,
    textAlign: ta || 'auto',
  };

  return <Text style={textStyle}>{text}</Text>;
};

export default AppText;
