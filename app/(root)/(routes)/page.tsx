'use client';

import { useEffect } from 'react';

import { userStoreModal } from '@/hooks/useStoreModal';

const SetupPage = () => {
  const isOpen = userStoreModal((state) => state.isOpen);
  const onOpen = userStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
