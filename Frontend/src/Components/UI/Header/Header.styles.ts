// Header styles// Header.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '@/Theme/colors';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.headerBg,
    height: 40,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    zIndex: 10,
  },
  logo: {
    width: 270,
    height: 35,
    resizeMode: 'contain',
    marginBottom: -2,
  },
});
