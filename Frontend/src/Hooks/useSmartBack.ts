// src/Hooks/useSmartBack.ts
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect, useRouter, useLocalSearchParams } from 'expo-router';
import type { Href } from 'expo-router';

/**
 * Hook for consistent back navigation handling.
 * - Prioritizes `backPath` if provided.
 * - Falls back to `origin` param if exists.
 * - Defaults to router.back()
 */
export default function useSmartBack(backPath?: Href) {
  const router = useRouter();
  const params = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (backPath) {
          router.replace(backPath);
        } else if (typeof params.origin === 'string') {
          router.replace(params.origin as Href);
        } else {
          router.back();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [backPath, params.origin])
  );
}
