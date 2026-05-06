/**
 * Sonner toast provider wrapper.
 * @module sonner
 * @internal
 */

'use client';;
import { Toaster as Sonner } from 'sonner';

import { useTheme } from '@/hooks/shared/use-theme';

const Toaster = ({
  ...props
}) => {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? 'dark' : 'light';

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        style: {
          width: 'fit-content',
          maxWidth: '22.25rem',
        },
      }}
      {...props} />
  );
};

export { Toaster };
