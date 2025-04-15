import { View, Text, Image, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  {styles}  from './Visuals.styles';

export function EmptyState({
  title = 'No Content Available',
  subtitle = 'There is nothing to show here right now.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require('@/Assets/images/emptyState.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

export function CenteredScreen({ children }: { children: React.ReactNode }) {
  return <View style={styles.centeredContainer}>{children}</View>;
}

export function ImagePreviewModal({
  visible,
  imageUrl,
  onClose,
}: {
  visible: boolean;
  imageUrl: string;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </Modal>
  );
}
