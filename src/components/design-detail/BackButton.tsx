'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
          router.back();
        } else {
          router.push('/explore');
        }
      }}
      className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md bg-dark-card border border-dark-border hover:bg-dark-accent"
    >
      <ArrowLeft size={16} className="mr-2" />
      Back
    </button>
  );
};

