// LoadingState.tsx
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './LoadingState.styles';

type LoadingStateProps = {
  message?: string;
};

export default function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/Assets/animations/SplachScreen.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
