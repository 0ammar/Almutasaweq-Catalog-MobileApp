// PaginationControls.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '@/Theme/colors';
import { spaces } from '@/Theme/spaces';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: spaces.md,
    paddingVertical: spaces.sm / 1.5,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  button: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  pageInfo: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
