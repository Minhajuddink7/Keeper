import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import ActionButton from '../../Buttons/ActionButton';
import Container from '../../Layouts/Container';
import HStack from '../../Layouts/HStack';
import AppText from '../../Typography/AppText';
import Gap from '../Gap';

const BottomModal = ({modalOpen, setModalOpen, children}) => {
  return (
    <Modal
      isVisible={modalOpen}
      style={{justifyContent: 'flex-end', margin: 0}}
      onBackdropPress={() => {
        setModalOpen(false);
      }}>
      {children}
    </Modal>
  );
};

export default BottomModal;
