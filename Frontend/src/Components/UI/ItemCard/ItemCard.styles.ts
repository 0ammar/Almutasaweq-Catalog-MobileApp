import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; 

export const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: cardWidth / 1.2,
    borderRadius: 14,
    backgroundColor: '#f4f4f4',
    marginBottom: 5,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  code: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 2,
  },
});
