import { StyleSheet } from 'react-native';
import { colors } from '@/Theme/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },

  centeredMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  invalidText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },

  pickBtn: {
    backgroundColor: colors.headerBg,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },

  pickBtnText: {
    color: '#fff',
    fontSize: 15,
  },

  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  previewList: {
    marginTop: 20,
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
  },

  image: {
    width: '100%',
    height: 230,
    borderRadius: 12,
  },

  deleteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    elevation: 4,
  },

  uploadBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },

  uploadBtnText: {
    color: '#fff',
    fontSize: 15,
  },
});
