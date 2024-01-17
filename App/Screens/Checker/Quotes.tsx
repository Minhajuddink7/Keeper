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
  changeQuotes,
  deleteQuote,
} from '../../Data/redux/actions/checkerActions';
import commonStyles from './commonStyles';
import AddButton from './AddButton';
import BottomModal from '../../Components/Common/modals/BottomModal';
import Gap from '../../Components/Common/Gap';
import Container from '../../Components/Layouts/Container';
import ActionButton from '../../Components/Buttons/ActionButton';
import {showToast} from '../../Helpers/utils';
const {DARK_THEME_COLOR} = commonData.colors;
const Quotes = () => {
  const quotes: any = useSelector<RootStateOrAny>(
    state => state.checker.quotes,
  );
  const dispatch = useDispatch();

  const deleteQuoteItem = id => {
    dispatch(deleteQuote(id));
  };
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [quote, setQuote] = useState('');
  const addQuote = () => {
    if (!quote) {
      showToast('Please enter a quote!');
      return;
    }
    const newQuote = {id: Date.now(), quote};
    const newQuotes = [...quotes, newQuote];
    dispatch(changeQuotes(newQuotes));
    showToast('Quote Added');
    setQuote('');
  };
  const markAsPinned = quote => {
    // console.log('marked', quote);
    const markedQuote = {...quote, isMarked: true};
    const newQuotes = [...quotes].filter(q => q.id !== quote.id);
    newQuotes.unshift(markedQuote);
    dispatch(changeQuotes(newQuotes));
    showToast('Quote Pinned');
    setQuote('');
  };
  return (
    <View style={{flex: 1}}>
      <View style={{paddingTop: 7, paddingBottom: 10}}>
        {quotes?.length === 0 ? (
          <NoItem
            text="No Quotes found!"
            color={commonData.colors.CHECKER_SECTION_COLOR}
          />
        ) : (
          <FlatList
            data={quotes}
            renderItem={({item: quote}) => {
              return (
                <View
                  style={{
                    ...commonStyles.card,
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'flex-start',
                  }}>
                  <AppText
                    text={`"${quote.quote}"`}
                    type={`${commonData.fonts.BOLD},#fff,18`}
                  />
                  <HStack justifyContent="flex-end">
                    <TouchableOpacity onPress={() => markAsPinned(quote)}>
                      {quote.isMarked ? (
                        <DynamicIcon
                          color="#ccc"
                          family="AntDesign"
                          name="pushpin"
                          size={16}
                        />
                      ) : (
                        <DynamicIcon
                          color="#ccc"
                          family="AntDesign"
                          name="pushpino"
                          size={16}
                        />
                      )}
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
            }}
          />
          // quotes?.map((quote, i) => {
          //   return (
          //     <View key={i} style={commonStyles.card}>
          //       <AppText
          //         text={`"${quote.quote}"`}
          //         type={`${commonData.fonts.BOLD},#fff,18`}
          //       />
          //       <HStack justifyContent="flex-end">
          //         <TouchableOpacity>
          //           <DynamicIcon
          //             color="#ccc"
          //             family="AntDesign"
          //             name="pushpino"
          //             size={16}
          //           />
          //         </TouchableOpacity>
          //         <AppText text="   " />
          //         <TouchableOpacity onPress={() => deleteQuoteItem(quote.id)}>
          //           <DynamicIcon
          //             color="#ccc"
          //             family="FontAwesome5"
          //             name="trash"
          //             size={16}
          //           />
          //         </TouchableOpacity>
          //       </HStack>
          //     </View>
          //   );
          // })
        )}
      </View>
      <BottomModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen}>
        <View style={commonStyles.addBottomModal}>
          <Gap gap={5} />
          {/* <Container> */}
          {/* <TextBox placeholder="Enter your quote" /> */}
          <TextInput
            multiline={true}
            placeholder="Enter a new Quote!"
            placeholderTextColor="#777"
            value={quote}
            onChangeText={text => {
              setQuote(text);
            }}
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
                  setAddModalOpen(false);
                }}
              />
            </View>
            <View style={{flex: 0.47}}>
              <ActionButton
                text="Save"
                action="save"
                onPress={() => {
                  addQuote();
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

export default Quotes;

const styles = StyleSheet.create({});
