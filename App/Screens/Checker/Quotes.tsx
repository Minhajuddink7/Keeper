import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppText from '../../Components/Typography/AppText';
import {commonData} from '../../Data/static/commonData';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import HStack from '../../Components/Layouts/HStack';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import NoItem from '../../Components/Common/NoItem';
import {deleteQuote} from '../../Data/redux/actions/checkerActions';

const Quotes = () => {
  const quotes: any = useSelector<RootStateOrAny>(
    state => state.checker.quotes,
  );
  const dispatch = useDispatch();

  const deleteQuoteItem = id => {
    dispatch(deleteQuote(id));
  };
  return (
    <ScrollView>
      {quotes?.length === 0 ? (
        <NoItem
          text="No Quotes found!"
          color={commonData.colors.CHECKER_SECTION_COLOR}
        />
      ) : (
        quotes?.map((quote, i) => {
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
                text={`"${quote.quote}"`}
                type={`${commonData.fonts.BOLD},#fff,18`}
              />
              <HStack justifyContent="flex-end">
                <TouchableOpacity>
                  <DynamicIcon
                    color="#ccc"
                    family="AntDesign"
                    name="pushpino"
                    size={16}
                  />
                </TouchableOpacity>
                <AppText text="   " />
                <TouchableOpacity onPress={() => deleteQuoteItem(quote.id)}>
                  <DynamicIcon
                    color="#ccc"
                    family="FontAwesome5"
                    name="trash"
                    size={16}
                  />
                </TouchableOpacity>
              </HStack>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default Quotes;

const styles = StyleSheet.create({});
