'use client';

import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'fumadocs-ui/components/ui/popover';

type TermTooltipProps = {
  children: ReactNode;
  description: ReactNode;
  note: string | number;
  className?: string;
};

export function DocNote({
  children,
  description,
  note,
  className,
}: TermTooltipProps) {
  const tooltipId = useId();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openPopover() {
    clearCloseTimer();
    setOpen(true);
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, 120);
  }

  return (
    <span className={cn('inline', className)}>
      <span>{children}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-describedby={tooltipId}
            aria-label="용어 설명 열기"
            onPointerEnter={openPopover}
            onPointerLeave={scheduleClose}
            onFocus={openPopover}
            onBlur={scheduleClose}
            className="relative -top-1 ml-0.5 inline-flex cursor-help appearance-none rounded-sm bg-transparent p-0 align-super text-[0.7em] font-medium leading-none text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-primary/30"
          >
            [{note}]
          </button>
        </PopoverTrigger>
        <PopoverContent
          id={tooltipId}
          role="tooltip"
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onPointerEnter={openPopover}
          onPointerLeave={scheduleClose}
          className="w-72 max-w-[calc(100vw-2rem)] px-3 py-2 text-left text-sm leading-5"
        >
          {description}
        </PopoverContent>
      </Popover>
    </span>
  );
}
