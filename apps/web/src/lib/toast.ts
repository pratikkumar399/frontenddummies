import toast, { ToastOptions } from 'react-hot-toast';

/**
 * Toast utility wrapper for consistent styling and behavior
 */
export const showToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      duration: 1000,
      style: {
        background: '#262626',
        color: '#eff1f6',
        border: '1px solid #333',
        borderRadius: '0.75rem',
        padding: '12px 16px',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#eff1f6',
      },
      ...options,
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      duration: 1000,
      style: {
        background: '#262626',
        color: '#eff1f6',
        border: '1px solid #dc2626',
        borderRadius: '0.75rem',
        padding: '12px 16px',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#dc2626',
        secondary: '#eff1f6',
      },
      ...options,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast(message, {
      duration: 1000,
      style: {
        background: '#262626',
        color: '#eff1f6',
        border: '1px solid #333',
        borderRadius: '0.75rem',
        padding: '12px 16px',
        fontSize: '14px',
      },
      iconTheme: {
        primary: '#4ade80',
        secondary: '#eff1f6',
      },
      ...options,
    });
  },
};

