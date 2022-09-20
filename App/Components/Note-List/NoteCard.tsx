import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HStack from '../Layouts/HStack';
import DynamicIcon from '../Common/DynamicIcon';
import AppText from '../Typography/AppText';
import {useDispatch} from 'react-redux';
import {toggleStared} from '../../Data/redux/actions/notesActions';
import {commonData} from '../../Data/static/commonData';
import moment from 'moment';

const NoteCard = ({note, onDelete, onPeek, onSelect, onEdit}) => {
  const dispatch = useDispatch();
  // const [isHeaderShown, setIsHeaderShown] = useState(true);
  const toggleStar = () => {
    dispatch(toggleStared({id: note.id}));
  };
  return (
    <View style={styles.noteCard}>
      <View
        style={{
          borderRadius: 8,
          flex: 6,
          marginBottom: 10,
          backgroundColor: '#120E43',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={onSelect} style={{flex: 1}}>
          {note?.title ? (
            <AppText
              text={note.title}
              type={`${commonData.fonts.REGULAR},#fff,18`}
            />
          ) : (
            <AppText
              text={`${note.body.substr(0, 25)}.......`}
              type={`${commonData.fonts.REGULAR},#fff,`}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            right: 5,
            padding: 10,
          }}
          onPress={onPeek}>
          <DynamicIcon
            name="eye"
            family="FontAwesome5"
            size={18}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            right: 5,
            padding: 10,
          }}
          onPress={toggleStar}>
          {note.isStared ? (
            <DynamicIcon
              name="star"
              family="FontAwesome"
              size={18}
              color="#fff"
            />
          ) : (
            <DynamicIcon
              name="star-o"
              family="FontAwesome"
              size={18}
              color="#fff"
            />
          )}
        </TouchableOpacity>
      </View>

      <HStack justifyContent="space-between">
        <View
          style={{
            height: 40,
            borderRadius: 8,
            flex: 6,
            // width: ,
            backgroundColor: '#120E43',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <AppText
            text={moment(note.id).format('MMM DD YYYY')}
            type={`${commonData.fonts.REGULAR},#fff,`}
          />
          <AppText
            text={moment(note.id).format('hh:mm A')}
            type={`${commonData.fonts.REGULAR},#fff,`}
          />
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <DynamicIcon
            family="FontAwesome5"
            name="pen"
            size={16}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actionButton,
            backgroundColor: commonData.colors.DANGER_COLOR,
          }}
          onPress={onDelete}>
          <DynamicIcon
            family="FontAwesome5"
            name="trash"
            size={16}
            color="#fff"
          />
        </TouchableOpacity>
      </HStack>
    </View>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  noteCard: {
    marginHorizontal: '6%',
    padding: 10,
    backgroundColor: '#ccd',
    // backgroundColor: '#eef',
    height: 120,
    borderRadius: 8,
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    backgroundColor: '#120E43',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
