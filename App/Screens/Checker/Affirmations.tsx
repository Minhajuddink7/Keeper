import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  changeAffirmations,
  deleteAffirmation,
  deleteQuote,
} from '../../Data/redux/actions/checkerActions';
import commonStyles from './commonStyles';
import AddButton from './AddButton';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Gap from '../../Components/Common/Gap';
import Container from '../../Components/Layouts/Container';
import ActionButton from '../../Components/Buttons/ActionButton';
import {showToast} from '../../Helpers/utils';

const Affirmations = () => {
  const affirmations: any = useSelector<RootStateOrAny>(
    state => state.checker.affirmations,
  );
  const dispatch = useDispatch();
  const [affirm, setAffirm] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const deleteItem = id => {
    dispatch(deleteAffirmation(id));
  };

  const addAffirmation = () => {
    if (!affirm) {
      showToast('Please enter a new affirmation!');
      return;
    }
    const newAffirmation = {id: Date.now(), affirmation: affirm};
    const newAffirmations = [...affirmations, newAffirmation];
    dispatch(changeAffirmations(newAffirmations));
    showToast('Affirmation Added');
    setAffirm('');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 7, marginBottom: 10}}>
        {affirmations?.length === 0 ? (
          <NoItem
            text="No Affirmation found!"
            color={commonData.colors.CHECKER_SECTION_COLOR}
          />
        ) : (
          <FlatList
            data={affirmations}
            renderItem={({item: affirmation}) => {
              return (
                <View
                  style={{
                    ...commonStyles.card,
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'flex-start',
                    // flex: 1,
                  }}>
                  <HStack justifyContent="flex-end">
                    {/* <AppText text="   " /> */}
                    <TouchableOpacity
                      onPress={() => deleteItem(affirmation.id)}
                      style={{paddingBottom: 5}}>
                      <DynamicIcon
                        color="#ccc"
                        family="FontAwesome5"
                        name="trash"
                        size={16}
                      />
                    </TouchableOpacity>
                  </HStack>
                  <AppText
                    text={affirmation.affirmation}
                    type={`${commonData.fonts.BOLD},#fff,18`}
                    // mr={10}
                  />
                </View>
              );
            }}
          />
        )}
      </View>
      <BottomModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
        <View style={commonStyles.addBottomModal}>
          <Gap gap={5} />
          {/* <Container> */}
          {/* <TextBox placeholder="Enter your quote" /> */}
          <TextInput
            multiline={true}
            placeholder="Enter a new Affirmation!"
            placeholderTextColor="#777"
            value={affirm}
            onChangeText={text => {
              setAffirm(text);
            }}
            style={{
              borderWidth: 1,
              borderRadius: 8,
              paddingLeft: 10,
              backgroundColor: commonData.colors.DARK_THEME_COLOR,
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
                  setAddModalOpen(false);
                }}
              />
            </View>
            <View style={{flex: 0.47}}>
              <ActionButton
                text="Save"
                action="save"
                onPress={() => {
                  addAffirmation();
                  setAddModalOpen(false);
                }}
              />
            </View>
          </HStack>
          {/* </Container> */}
        </View>
      </BottomModal>
      <AddButton onPress={() => setAddModalOpen(true)} />
    </View>
  );
};

export default Affirmations;

const styles = StyleSheet.create({});
