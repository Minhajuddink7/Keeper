import Toast from 'react-native-simple-toast';
export const showToast = message => {
  return Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
};
