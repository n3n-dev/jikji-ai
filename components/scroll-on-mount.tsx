'use client';
import { useEffect } from 'react';
import { scrollToSection } from '@/lib/scroll-to-section';

export function ScrollOnMount() {
  useEffect(() => {
    const target = sessionStorage.getItem('pendingScroll');
    if (target) {
      sessionStorage.removeItem('pendingScroll');
      setTimeout(() => scrollToSection(target), 100);
    }
  }, []);
  return null;
}
