import {StyleSheet} from 'react-native';
import {commonData} from '../../Data/static/commonData';

const commonStyles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderRadius: 4,
    // borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    backgroundColor: '#333',
  },
  addBottomModal: {
    borderWidth: 0.2,
    borderColor: commonData.colors.CHECKER_SECTION_COLOR,
    maxHeight: '70%',
    backgroundColor: '#222',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
export default commonStyles;
