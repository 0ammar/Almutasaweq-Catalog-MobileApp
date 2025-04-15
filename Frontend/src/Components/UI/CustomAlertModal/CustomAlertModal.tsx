import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './CustomAlertModal.styles';

interface Props {
  isVisible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export default function CustomAlertModal({
  isVisible,
  title,
  message,
  onClose,
}: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.3}
    >
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable onPress={onClose} style={styles.button}>
          <Text style={styles.buttonText}>حسنًا</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
