'use client';

import { useState } from 'react';

export function useFormSubmit(reset: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return { isSubmitting, isSuccess, onSubmit };
}
