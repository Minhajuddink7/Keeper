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
import {
  deleteAffirmation,
  deleteQuote,
} from '../../Data/redux/actions/checkerActions';

const Affirmations = () => {
  const affirmations: any = useSelector<RootStateOrAny>(
    state => state.checker.affirmations,
  );
  const dispatch = useDispatch();

  const deleteItem = id => {
    dispatch(deleteAffirmation(id));
  };
  return (
    <ScrollView>
      {affirmations?.length === 0 ? (
        <NoItem
          text="No Affirmation found!"
          color={commonData.colors.CHECKER_SECTION_COLOR}
        />
      ) : (
        affirmations?.map((affirmation, i) => {
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
                text={affirmation.affirmation}
                type={`${commonData.fonts.BOLD},#fff,18`}
              />
              <HStack justifyContent="flex-end">
                {/* <TouchableOpacity>
                  <DynamicIcon
                    color="#ccc"
                    family="AntDesign"
                    name="pushpino"
                    size={16}
                  />
                </TouchableOpacity> */}
                <AppText text="   " />
                <TouchableOpacity onPress={() => deleteItem(affirmation.id)}>
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

export default Affirmations;

const styles = StyleSheet.create({});
