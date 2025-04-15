import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';

const { width } = Dimensions.get('window');
const imageSize = width - 60;

export const styles = StyleSheet.create({
  imageCount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
    
  modalContent: {
    width: width - 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  closeButtonAbsolute: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    alignSelf: 'center',
  },

  noImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: 16,
    backgroundColor: '#eee',
    alignSelf: 'center',
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },

  code: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: '#e4e4e4',
    width: '85%',
    marginVertical: 12,
  },

  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 22,
  },

  buttonsInline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 80,
    marginTop: 20,
    width: '100%',
  },

  uploadBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 2,
  },

  uploadBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  editBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 2,
  },

  editBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  loadingIndicator: {
    paddingVertical: 60,
  },

  errorText: {
    marginTop: 40,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  fullscreenModal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  fullImage: {
    width: '90%',
    height: '80%',
    borderRadius: 14,
    resizeMode: 'contain',
  },
});
