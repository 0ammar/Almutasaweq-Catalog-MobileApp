// SearchBar styles// SearchBar.styles.ts
import { StyleSheet, Platform, I18nManager } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
    marginTop: 7,
    marginBottom: 5,
    paddingHorizontal: 14,
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  spinner: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    paddingVertical: Platform.OS === 'android' ? 6 : 10,
  },
});
