// SearchBar.tsx
import { useState, useRef, useEffect } from 'react';
import { TextInput, TouchableOpacity, Animated,  ActivityIndicator,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './SearchBar.styles';

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  isLoading?: boolean;
};

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search...',
  isLoading = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedBorder = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedBorder, {
      toValue: isFocused ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const borderColor = animatedBorder.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#888'],
  });

  return (
    <Animated.View style={[styles.wrapper, { borderColor }]}>
      <Icon name="search" size={20} color="#888" style={styles.icon} />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />

      {isLoading ? (
        <ActivityIndicator size={18} color="#aaa" style={styles.spinner} />
      ) : Boolean(value) && (
        <TouchableOpacity onPress={() => onChange('')}>
          <Icon name="close" size={20} color="#888" style={styles.clearIcon} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}