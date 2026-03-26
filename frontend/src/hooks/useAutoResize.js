import { useLayoutEffect } from 'react';

export const useAutoResize = (ref, value) => {
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [ref, value]);
};
