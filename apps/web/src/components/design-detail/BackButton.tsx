'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@repo/ui';
import { ButtonVariant, ButtonSize } from '@/types/types';

interface BackButtonProps {
  href?: string;
}

export const BackButton = ({ href = '/explore' }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(href);
      }}
      variant={ButtonVariant.OUTLINE}
      size={ButtonSize.SM}
      className="inline-flex items-center text-sm text-zinc-400 hover:text-white px-3 py-1.5 bg-dark-card border-dark-border hover:bg-dark-accent"
      icon={<ArrowLeft size={16} />}
    >
      Back
    </Button>
  );
};

