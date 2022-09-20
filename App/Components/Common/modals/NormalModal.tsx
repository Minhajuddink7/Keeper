import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const NormalModal = ({visible, setVisible, children}) => {
  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <View style={{flex: 0.5, backgroundColor: '#bbb', borderRadius: 8}}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

export default NormalModal;

const styles = StyleSheet.create({});
