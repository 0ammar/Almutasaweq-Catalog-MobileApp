// Header.tsx
import { View, Image } from 'react-native';
import { styles } from './Header.styles';

export default function Header(): JSX.Element {
  return (
    <View style={styles.header}>
      <Image
        source={require('@/Assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
}