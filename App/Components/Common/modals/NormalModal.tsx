import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
const NormalModal = ({visible, setVisible, children, flex = 0.5}) => {
  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={() => setVisible(false)}>
        {/* <View style={{flex: flex, backgroundColor: '#bbb', borderRadius: 8}}> */}
        {children}
        {/* </View> */}
      </Modal>
    </View>
  );
};

export default NormalModal;

const styles = StyleSheet.create({});
