import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import commonStyles from './commonStyles';
import Gap from '../../Components/Common/Gap';
import AppText from '../../Components/Typography/AppText';
import DynamicIcon from '../../Components/Common/DynamicIcon';
import HStack from '../../Components/Layouts/HStack';
import BottomModal from '../../Components/Common/modals/BottomModal';
import {commonData} from '../../Data/static/commonData';
import ActionButton from '../../Components/Buttons/ActionButton';
import AddButton from './AddButton';
const {
  BLACK_COLOR,
  DARK_THEME_COLOR,
  CHECKER_SECTION_COLOR,
  NOTES_SECTION_COLOR,
} = commonData.colors;
const Lists = () => {
  const [listModalOpen, setListModalOpen] = useState(false);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Gap />
        <View style={{...commonStyles.card}}>
          <HStack justifyContent="space-between">
            <AppText text="" />
            <AppText
              text="My Top Priorities"
              type="Kalam-Bold,#ddd,18"
              td="underline"
              //   ta="center"
            />
            <TouchableOpacity onPress={() => setListModalOpen(true)}>
              <DynamicIcon
                family="FontAwesome"
                name="edit"
                size={16}
                color="#fff"
              />
            </TouchableOpacity>
          </HStack>
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
          <AppText text="list item 1" type="Kalam-Medium,#ddd,16" />
        </View>
        <BottomModal modalOpen={listModalOpen} setModalOpen={setListModalOpen}>
          <View style={[styles.modalAddRoom]}>
            {/* <Gap /> */}
            {/* <Container> */}
            {/* <TextBox placeholder="Enter your quote" /> */}
            <View style={{margin: 10}}>
              <TextInput
                multiline={true}
                placeholder={'Enter the list title!'}
                placeholderTextColor="#777"
                //   value={index === 0 ? todo : index === 1 ? affirmation : quote}
                //   onChangeText={text => {
                //     if (index === 0) {
                //       setTodo(text);
                //     } else if (index === 1) {
                //       setAffirmation(text);
                //     } else {
                //       setQuote(text);
                //     }
                //   }}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                  backgroundColor: DARK_THEME_COLOR,
                  fontFamily: 'Kalam-Regular',
                  fontSize: 20,
                  color: '#ddd',
                }}
                autoFocus={true}
                // numberOfLines={2}
              />
              <TextInput
                multiline={true}
                placeholder={'sdfdf'}
                placeholderTextColor="#777"
                //   value={index === 0 ? todo : index === 1 ? affirmation : quote}
                //   onChangeText={text => {
                //     if (index === 0) {
                //       setTodo(text);
                //     } else if (index === 1) {
                //       setAffirmation(text);
                //     } else {
                //       setQuote(text);
                //     }
                //   }}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                  backgroundColor: DARK_THEME_COLOR,
                  fontFamily: 'Kalam-Regular',
                  fontSize: 20,
                  color: '#ddd',
                }}
                autoFocus={true}
                // numberOfLines={2}
              />
              {/* <AppText text="Confirm Delete?" type="Kalam-Bold,#000,18" /> */}
              <Gap />
              <HStack justifyContent="space-between">
                <View style={{flex: 0.47}}>
                  <ActionButton
                    text="Cancel"
                    action="cancel"
                    onPress={() => {
                      // setAddModalOpen(false);
                    }}
                  />
                </View>
                <View style={{flex: 0.47}}>
                  <ActionButton
                    text="Save"
                    action="save"
                    onPress={() => {
                      // save();
                      // setAddModalOpen(false);
                    }}
                  />
                </View>
              </HStack>
            </View>
            {/* </Container> */}
          </View>
        </BottomModal>
      </ScrollView>
      {/* <View style={{position: 'absolute', right: 15, bottom: 15}}> */}
      <AddButton onPress={() => {}} />
      {/* </View> */}
    </View>
  );
};

export default Lists;

const styles = StyleSheet.create({
  modalAddRoom: {
    borderWidth: 0.2,
    borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    maxHeight: '70%',
    backgroundColor: '#222',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
