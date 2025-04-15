import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: 15,
    paddingTop: 10,
    gap: 10,
  },
  searchWrapper: {
    position: 'relative',
    zIndex: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 52,
    left: 14,
    right: 14,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
});

export default styles;
