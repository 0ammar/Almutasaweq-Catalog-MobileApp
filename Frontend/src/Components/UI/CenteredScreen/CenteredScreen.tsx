import { View } from 'react-native';
import { styles } from './CenteredScreen.styles';

type CenteredScreenProps = {
  children: React.ReactNode;
};

export default function CenteredScreen({ children }: CenteredScreenProps) {
  return <View style={styles.container}>{children}</View>;
}
