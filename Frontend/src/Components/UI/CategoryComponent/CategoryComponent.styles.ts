import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@/Theme/colors';

const size = Dimensions.get('window').width / 2 - 35;

export const styles = StyleSheet.create({
  card: {
    width: size,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 20,
    paddingVertical: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrapper: {
    width: 100,
    height: 80,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 0,
    alignItems: 'center'
  },
  image: {
    width: '70%',
    height: '70%',
    textAlign: 'center'
  },
  name: {       
    margin:0,
    padding: 0,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
});
