import { useRef, useState } from 'react';
import Modal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Image, Pressable, Dimensions, ActivityIndicator, } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useItemDetails } from '@/Hooks';
import { styles } from '@/Theme/ItemStyles/itemDetails.styles';
import { getItemImage } from '@/Services/APIs/ItemsServices';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');
const fallbackImage = require('@/Assets/images/no-image.png');
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl;

export default function ItemDetailsScreen() {
  const { itemNo } = useLocalSearchParams();
  const router = useRouter();
  const cache = useRef<{ [key: string]: string }>({});

  const { item, loading } = useItemDetails(itemNo);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullImageUri, setFullImageUri] = useState<string | null>(null);

  const images = item?.images ?? [];

  const handleClose = () => router.back();
  const handleEdit = () => item?.itemNo && router.push(`/ItemDetails/edit/${item.itemNo}`);
  const handleUpload = () => item?.itemNo && router.push(`/ItemDetails/upload/${item.itemNo}`);

  const handleOpenImage = async (imgName: string) => {
    setSelectedImage(imgName);

    if (cache.current[imgName]) {
      setFullImageUri(cache.current[imgName]);
      return;
    }

    try {
      if (item?.itemNo) {
        const uri = await getItemImage(item.itemNo, imgName);
        const full = uri.startsWith('http') ? uri : `${BASE_URL}/UploadedImages/${uri}`;
        cache.current[imgName] = full;
        setFullImageUri(full);
      }
    } catch (error) {
      console.error('Failed to load full image:', error);
      setFullImageUri(null);
    }
  };

  const renderImage = (imgName: string) => (
    <Pressable onPress={() => handleOpenImage(imgName)}>
      <Image
        source={{ uri: `${BASE_URL}/UploadedImages/${imgName}` }}
        style={styles.image}
        resizeMode="contain"
      />
    </Pressable>
  );

  return (
    <>
      {/* Main Item Details Modal */}
      <Modal
        isVisible
        backdropOpacity={0.3}
        animationIn="zoomIn"
        animationOut="fadeOut"
        onBackdropPress={handleClose}
        useNativeDriver
      >
        <View style={styles.modalContent}>
          <Pressable onPress={handleClose} style={styles.closeButtonAbsolute}>
            <Ionicons name="close-circle" size={28} color="#333" />
          </Pressable>

          {loading ? (
            <ActivityIndicator size="large" color="#444" style={styles.loadingIndicator} />
          ) : !item ? (
            <Text style={styles.errorText}>فشل في تحميل المنتج</Text>
          ) : (
            <>
              {images.length > 0 ? (
                <Carousel
                  width={width - 60}
                  height={width - 60}
                  data={images}
                  scrollAnimationDuration={500}
                  renderItem={({ item }: { item: string }) => renderImage(item)}
                  style={{ marginBottom: 10 }}
                  loop
                  autoPlay={false}
                />
              ) : (
                <Image
                  source={fallbackImage}
                  style={styles.noImage}
                  resizeMode="contain"
                />
              )}

              <Text style={styles.name }>{item.name}</Text>
              <Text style={styles.code}>{item.itemNo}</Text>
              <Text style={styles.imageCount}>عدد الصور: {images.length}</Text>
              <View style={styles.divider} />
              <Text style={styles.description}>{item.description || 'لا يوجد وصف متاح'}</Text>
 
              <View style={styles.buttonsInline}>
                <Pressable style={styles.uploadBtn} onPress={handleUpload}>
                  <Text style={styles.uploadBtnText}>تعديل صور</Text>
                </Pressable>
                <Pressable style={styles.editBtn} onPress={handleEdit}>
                  <Text style={styles.editBtnText}>رفع صور</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </Modal>
      {selectedImage && fullImageUri && (
        <View style={styles.fullImageWrapper}>
          <Image
            source={{ uri: fullImageUri }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      )}
    </>
  );
}
