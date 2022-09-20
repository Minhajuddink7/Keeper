import {Text} from 'react-native';
import React from 'react';
import {commonData} from '../../Data/static/commonData';
type AppTextProps = {
  text: string;
  type?: string;
  mr?: number;
  ml?: number;
  ta?: string;
  selectable?: boolean;
  td?: string;
};

const AppText = ({text, type, mr, ml, ta, selectable, td}: AppTextProps) => {
  const styleArr = type?.split(/[,]/);
  let textStyle: any = {
    fontFamily: styleArr?.[0] || commonData.fonts.REGULAR,
    color: styleArr?.[1] || commonData.colors.BLACK_COLOR,
    fontSize: styleArr?.[2] ? JSON.parse(styleArr[2]) : 14,
    marginLeft: ml || 0,
    marginRight: mr || 0,
    textAlign: ta || 'auto',
    textDecorationLine: td || 'none',
  };

  return (
    <Text style={textStyle} selectable={selectable || true}>
      {text}
    </Text>
  );
};

export default AppText;
