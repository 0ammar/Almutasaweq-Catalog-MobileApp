import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { getItemImage } from '@/Services/APIs/ItemsServices';

export function useItemDetailsModal(itemNo?: string) {
  const router = useRouter();
  const cache = useRef<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullImageUri, setFullImageUri] = useState<string | null>(null);

  const handleClose = () => router.back();

  const handleEdit = () => itemNo && router.push(`/ItemDetails/edit/${itemNo}`);
  const handleUpload = () => itemNo && router.push(`/ItemDetails/upload/${itemNo}`);

  // فتح الصورة المكبرة عند النقر
  const handleOpenImage = async (imgName: string) => {
    setSelectedImage(imgName);

    // إذا كانت الصورة في الذاكرة، استخدمها مباشرة
    if (cache.current[imgName]) {
      setFullImageUri(cache.current[imgName]);
      console.log("FULL IMAGE URI (from cache):", cache.current[imgName]);
      return;
    }

    // إذا كانت الصورة غير موجودة في الكاش، جلبها من السيرفر
    try {
      if (itemNo) {
        const imageUrl = await getItemImage(itemNo, imgName);
        cache.current[imgName] = imageUrl;
        setFullImageUri(imageUrl);
        console.log("FULL IMAGE URI (fetched):", imageUrl);
      }
    } catch (error) {
      console.error('❌ Failed to load full image:', error);
      setFullImageUri(null);
    }
  };

  const handleCloseFullImage = () => {
    setSelectedImage(null);
    setFullImageUri(null);
  };

  return {
    selectedImage,
    fullImageUri,
    handleOpenImage,
    handleClose,
    handleEdit,
    handleUpload,
    handleCloseFullImage,
  };
}
