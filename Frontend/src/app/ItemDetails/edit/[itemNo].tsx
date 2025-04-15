import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useImagePicker } from '@/Hooks/useImagePicker';
import { CustomAlertModal } from '@/Components/UI';
import { styles } from '@/Theme/ItemStyles/edit.styles';
import { colors } from '@/Theme/colors';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


export default function EditItemImagesScreen() {
  const { itemNo } = useLocalSearchParams();
  const {
    images,
    pickImages,
    uploading,
    setUploading,
    setImages,
  } = useImagePicker();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!itemNo) {
    return (
      <View style={styles.centeredMessageContainer}>
        <Text style={styles.invalidText}>رقم المنتج غير صالح أو مفقود.</Text>
      </View>
    );
  }

  const uploadImages = async () => {
    if (images.length === 0) return;

    try {
      setUploading(true);

      const formData = new FormData();
      images.forEach((uri, index) => {
        formData.append('newImages', {
          uri,
          name: `image${index}.jpg`,
          type: 'image/jpeg',
        } as any);
      });

      await axios.post(`${BASE_URL}/api/items/${itemNo}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setModalData({
        title: '✔️ تم رفع الصور بنجاح',
        message: 'تمت إضافة الصور إلى المنتج بنجاح.',
      });
    } catch (error) {
      console.log('Upload error:', error);
      setModalData({
        title: '❌ خطأ في الرفع',
        message: 'حدث خلل أثناء رفع الصور، تأكد من الاتصال وجرب مرة أخرى.',
      });
    } finally {
      setUploading(false);
      setModalVisible(true);
    }
  };

  const handleDelete = (uriToRemove: string) => {
    setImages((prev) => prev.filter((uri) => uri !== uriToRemove));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={pickImages} style={styles.pickBtn}>
        <View style={styles.btnRow}>
          <Ionicons name="images-outline" size={20} color="#fff" />
          <Text style={styles.pickBtnText}>اختر الصور</Text>
        </View>
      </Pressable>

      <View style={styles.previewList}>
        {images.map((uri, index) => (
          <View key={index.toString()} style={styles.imageWrapper}>
            <Pressable onPress={() => setSelectedImage(uri)}>
              <Image source={{ uri }} style={styles.image} resizeMode="cover" />
            </Pressable>
            <Pressable onPress={() => handleDelete(uri)} style={styles.deleteIcon}>
              <Ionicons name="close-circle" size={22} color={colors.primary} />
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable
        onPress={uploadImages}
        style={[
          styles.uploadBtn,
          {
            backgroundColor: uploading || images.length === 0 ? '#ccc' : colors.primary,
          },
        ]}
        disabled={uploading || images.length === 0}
      >
        <View style={styles.btnRow}>
          <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
          <Text style={styles.uploadBtnText}>
            {uploading ? 'جاري الرفع...' : 'رفع الصور'}
          </Text>
        </View>
      </Pressable>

      <CustomAlertModal
        isVisible={modalVisible}
        title={modalData.title}
        message={modalData.message}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}
