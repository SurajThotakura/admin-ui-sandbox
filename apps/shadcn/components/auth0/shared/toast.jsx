/**
 * Toast notification utilities.
 * @module toast
 * @internal
 */

import { Flag } from 'lucide-react';
import { toast } from 'sonner';

import { DEFAULT_TOAST_SETTINGS } from '@/types/toast-types';

const TOAST_COLOR_CLASSES = {
  success: 'text-success-foreground',
  error: 'text-destructive-foreground',
  warning: 'text-warning-foreground',
  info: 'text-info-foreground'
};

const VALID_TOAST_TYPES = ['success', 'error', 'warning', 'info'];

const BASE_TOAST_Z_INDEX = 1000;
let toastZIndexCounter = 0;
const MAX_Z_INDEX_COUNTER = 1000;
const activeToastIds = new Set();

/**
 * Resets the z-index counter if no active toasts remain
 */
const resetCounterIfEmpty = () => {
  if (activeToastIds.size === 0) {
    toastZIndexCounter = 0;
  }
};

/**
 * Removes a toast from tracking and resets counter if needed
 * @param toastId - The toast ID to remove, or undefined to clear all
 */
const removeToastFromTracking = toastId => {
  if (toastId !== undefined && toastId !== null) {
    activeToastIds.delete(toastId);
  } else {
    activeToastIds.clear();
  }
  resetCounterIfEmpty();
};

let globalToastSettings = {
  ...DEFAULT_TOAST_SETTINGS,
};

/**
 * Sets global toast configuration. Called by Auth0ComponentProvider.
 * @param settings - Settings configuration
 * @internal
 */
export const setGlobalToastSettings = settings => {
  if (!settings) {
    globalToastSettings = {
      ...DEFAULT_TOAST_SETTINGS,
    };
    return;
  }

  globalToastSettings = {
    ...settings,
  };

  if (settings.provider === 'custom') {
    const { methods } = settings;
    const availableMethods = Object.keys(methods);

    if (availableMethods.length === 0) {
      console.warn(
        'Auth0ComponentProvider: Custom toast provider specified but no custom methods provided'
      );
    }

    availableMethods.forEach((method) => {
      if (typeof methods[method] !== 'function') {
        console.warn(
          `Auth0ComponentProvider: Custom toast method '${method}' is not a function`
        );
      }
    });
  }
};

/**
 * Gets the current global toast configuration.
 * @returns The current toast settings
 */
export const getGlobalToastSettings = () => globalToastSettings;

/**
 * Creates a styled message element with appropriate color classes.
 * @param type - The toast type for styling
 * @param message - The message text to style
 * @returns A React element with styled text
 */
const createStyledMessage = (type, message) => {
  const colorClass = TOAST_COLOR_CLASSES[type];
  return <span className={colorClass}>{message}</span>;
};

/**
 * Creates a default icon for the toast based on its type.
 * @param type - The toast type to create an icon for
 * @returns A React element with a styled Flag icon
 */
const createDefaultIcon = type => {
  const colorClass = TOAST_COLOR_CLASSES[type];
  return <Flag className={`h-4 w-4 ${colorClass}`} aria-hidden="true" />;
};

/**
 * Shows a toast notification using the configured provider.
 *
 * @param options - The toast configuration options
 * @param options.type - The type of toast ('success', 'error', 'info', 'warning', 'loading')
 * @param options.message - The message to display in the toast
 * @param options.className - Optional CSS class name for custom styling
 * @param options.icon - Optional custom icon to display
 * @param options.data - Additional options passed to the toast provider
 * @returns The toast instance ID or result from custom method
 */
export const showToast = (
  {
    type,
    message,
    className,
    icon,
    data = {}
  }
) => {
  if (!message?.trim()) {
    console.warn('showToast: Empty message provided');
    return;
  }

  if (!VALID_TOAST_TYPES.includes(type)) {
    console.error(
      `showToast: Invalid toast type '${type}'. Must be one of: ${VALID_TOAST_TYPES.join(', ')}`
    );
    return;
  }

  if (globalToastSettings.provider === 'custom' && globalToastSettings.methods[type]) {
    try {
      // Custom methods only receive the message - they handle their own configuration
      return globalToastSettings.methods[type](message);
    } catch (error) {
      console.error(`showToast: Error in custom ${type} method:`, error);
    }
  }

  const styledMessage = createStyledMessage(type, message);
  const defaultIcon = icon || createDefaultIcon(type);

  const currentZIndex = BASE_TOAST_Z_INDEX + toastZIndexCounter;
  toastZIndexCounter += 1;

  if (toastZIndexCounter >= MAX_Z_INDEX_COUNTER) {
    toastZIndexCounter = 0;
  }

  const toastOptions = {
    className,
    icon: defaultIcon,
    style: {
      zIndex: currentZIndex,
    },
    onDismiss: (toastId) => {
      removeToastFromTracking(toastId);
    },
    ...data,
  };

  try {
    const toastId = toast[type](styledMessage, toastOptions);
    if (toastId) {
      activeToastIds.add(toastId);
    }
    return toastId;
  } catch (error) {
    console.error(`showToast: Error showing ${type} toast:`, error);
    return toast(message);
  }
};

/**
 * Dismisses a toast notification by ID, or dismisses all toasts if no ID is provided.
 *
 * @param toastId - Optional toast ID to dismiss. If not provided, dismisses all toasts.
 */
export const dismissToast = toastId => {
  if (globalToastSettings.provider === 'custom' && globalToastSettings.methods.dismiss) {
    try {
      globalToastSettings.methods.dismiss(toastId?.toString());
    } catch (error) {
      console.error('dismissToast: Error in custom dismiss method:', error);
    }
    return;
  }

  toast.dismiss(toastId);

  removeToastFromTracking(toastId);
};
