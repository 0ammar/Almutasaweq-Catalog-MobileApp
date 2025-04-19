// LoadingState.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  animation: {
    width: width / 1.7,
    height: width / 1.7,
  },
  text: {
    fontSize: 14,
    marginTop: -50,
    color: '#444',
    fontWeight: '500',
    textAlign: 'center',
  },
});
