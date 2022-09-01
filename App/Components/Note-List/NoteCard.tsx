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

const NoteCard = ({note}) => {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  return (
    <View style={styles.noteCard}>
      <View
        style={{
          // height: 40,
          borderRadius: 8,
          flex: 6,
          marginBottom: 10,
          // width: ,
          backgroundColor: '#120E43',
          justifyContent: 'center',
          // alignItems: 'center',
          paddingLeft: 10,
        }}>
        {isHeaderShown ? (
          <AppText text={note.title} type="Montserrat-Bold,,18" />
        ) : (
          <ScrollView>
            <AppText
              text="This is the text for the body of this note sdf asdf asdf asd fasd fas dfas dfa sdfa sdf skld fjkls jdflkasjd fkla jsdlkf;aj sdlf;ka jskld;fj askl;dfj akls;dfj alks;dfj akls;dfj "
              type="Montserrat-SemiBold,,"
            />
          </ScrollView>
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 5,
            padding: 10,
            // backgroundColor: 'red',
          }}
          onPress={() => setIsHeaderShown(!isHeaderShown)}>
          <DynamicIcon
            name="eye"
            family="FontAwesome5"
            size={18}
            color="#fff"
          />
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
          <AppText text="Aug 25 2022" type="Montserrat-SemiBold" />
          <AppText text="10:23 AM" type="Montserrat-SemiBold" />
        </View>
        <TouchableOpacity style={styles.actionButton}>
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
            backgroundColor: '#D40000',
          }}>
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
    backgroundColor: '#eef',
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
