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
    width: width,
    height: width,
  },
  text: {
    fontSize: 16,
    marginTop: -100,
    color: '#444',
    fontWeight: '500',
    textAlign: 'center',
  },
});
