import { useEffect, useState } from 'react';

export const useOrigin = () => {
  const [isMouned, setIsMounted] = useState(false);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMouned) {
    return '';
  }
  return origin;
};
