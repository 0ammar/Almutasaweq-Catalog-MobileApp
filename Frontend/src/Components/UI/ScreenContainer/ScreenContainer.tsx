// ScreenContainer.tsx
import React from 'react';
import { View } from 'react-native';
import Header from '../Header/Header';
import CenteredScreen from '../CenteredScreen/CenteredScreen';
import LoadingState from '../LoadingState/LoadingState';
import { EmptyState } from '@/Components/Shared/Visuals/Visuals';
import { styles } from './ScreenContainer.styles';

type ScreenContainerProps = {
  loading: boolean;
  error: boolean;
  empty: boolean;
  emptyTitle?: string;
  emptySubtitle?: string;
  children: React.ReactNode;
};

export const ScreenContainer = ({
  loading,
  error,
  empty,
  emptyTitle,
  emptySubtitle,
  children,
}: ScreenContainerProps) => {
  const renderContent = () => {
    if (loading) {
      return (
        <CenteredScreen>
          <LoadingState message="Loading..." />
        </CenteredScreen>
      );
    }

    if (error) {
      return (
        <CenteredScreen>
          <EmptyState
            title="Something went wrong"
            subtitle="Check your internet connection and try again."
          />
        </CenteredScreen>
      );
    }

    if (empty) {
      return (
        <CenteredScreen>
          <EmptyState
            title={emptyTitle || 'No items found'}
            subtitle={emptySubtitle || 'Try a different name or item number.'}
          />
        </CenteredScreen>
      );
    }

    return children;
  };

  return (
    <View style={styles.container}>
      <Header />
      {renderContent()}
    </View>
  );
};