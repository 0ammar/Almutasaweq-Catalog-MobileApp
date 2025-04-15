import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';

const size = Dimensions.get('window').width / 2 - 35;

export const styles = StyleSheet.create({
  card: {
    width: size,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
