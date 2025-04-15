// PaginationControls.tsx
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@/Theme/colors';
import { styles } from './PaginationControls.styles';

type PaginationControlsProps = {
  page: number;
  hasMore: boolean;
  onNext: () => void;
  onBack: () => void;
};

export default function PaginationControls({
  page,
  hasMore,
  onNext,
  onBack,
}: PaginationControlsProps) {
  const start = (page - 1) * 30 + 1;
  const end = hasMore ? start + 29 : start;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBack}
        disabled={page === 1}
        style={[
          styles.button,
          { backgroundColor: page === 1 ? colors.disabled : colors.primary },
        ]}
      >
        <Icon name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        {start} - {end}
      </Text>

      <TouchableOpacity
        onPress={onNext}
        disabled={!hasMore}
        style={[
          styles.button,
          { backgroundColor: hasMore ? colors.primary : colors.disabled },
        ]}
      >
        <Icon name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}