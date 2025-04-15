import { StyleSheet } from 'react-native';
import { spaces } from '@/Theme/spaces';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: spaces.screenPadding,
    marginTop: spaces.screenMargin,
  },
  titleWrapper: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  titleUnderline: {
    height: 2,
    width: '60%',
    backgroundColor: '#ccc',
    borderRadius: 50,
    marginTop: 6,
  },
});
