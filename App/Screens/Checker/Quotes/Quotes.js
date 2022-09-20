import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../../Components/Typography/AppText';
import {commonData} from '../../../Data/static/commonData';

const Quotes = () => {
  const [quotes, setQuotes] = useState([
    {name: 'Desire is the root cause of all the sufferings'},
    {name: 'Even the most beautiful song is useless for the deaf'},
    {
      name: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
    },
  ]);
  return (
    <View>
      {quotes?.map((quote, i) => {
        return (
          <View
            key={i}
            style={{
              padding: 10,
              borderWidth: 0.5,
              margin: 6,
              borderRadius: 6,
              borderColor: commonData.colors.CHECKER_SECTION_COLOR,
            }}>
            <AppText
              text={`"${quote.name}"`}
              type={`${commonData.fonts.BOLD},#fff,18`}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Quotes;

const styles = StyleSheet.create({});
