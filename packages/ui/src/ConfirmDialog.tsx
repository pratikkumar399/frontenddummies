'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { ButtonVariant, ButtonSize } from './types';
import { X } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: ButtonVariant;
  destructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = ButtonVariant.PRIMARY,
  destructive = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the cancel button by default
      setTimeout(() => {
        const cancelButton = dialogRef.current?.querySelector('button[aria-label="Cancel"]') as HTMLButtonElement;
        cancelButton?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle Enter key on confirm
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isOpen && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onConfirm();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEnter);
    }

    return () => {
      document.removeEventListener('keydown', handleEnter);
    };
  }, [isOpen, onConfirm]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const finalConfirmVariant = destructive ? ButtonVariant.PRIMARY : confirmVariant;
  const confirmButtonClassName = destructive
    ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
    : 'p-2';

  if (!isOpen || !mounted) return null;

  const dialogContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-message"
      style={{ zIndex: 99999, position: 'fixed' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md bg-[#262626] border border-[#333] rounded-[12px] shadow-2xl"
        style={{ position: 'relative', zIndex: 100000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333]">
          <h2 id="dialog-title" className="text-lg font-bold text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white transition-colors p-1 rounded-md hover:bg-[#333] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p id="dialog-message" className="text-[#eff1f6] leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#333]">
          <Button
            onClick={onClose}
            variant={ButtonVariant.GHOST}
            size={ButtonSize.MD}
            aria-label="Cancel"
            className="p-2"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={finalConfirmVariant}
            size={ButtonSize.MD}
        
            className={confirmButtonClassName}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  // Use portal to render dialog outside component tree to avoid z-index issues
  if (typeof window !== 'undefined' && document.body) {
    return createPortal(dialogContent, document.body);
  }

  return null;
};

