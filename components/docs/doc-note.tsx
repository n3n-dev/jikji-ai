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
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mediaQueryWithLegacyApi = mediaQuery as MediaQueryList & {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };
    const updateCanHover = () => {
      setCanHover(mediaQuery.matches);
    };
    const supportsEventListener =
      typeof mediaQueryWithLegacyApi.addEventListener === 'function';

    updateCanHover();

    if (supportsEventListener) {
      mediaQueryWithLegacyApi.addEventListener('change', updateCanHover);
    } else {
      mediaQueryWithLegacyApi.addListener?.(updateCanHover);
    }

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      if (supportsEventListener) {
        mediaQueryWithLegacyApi.removeEventListener('change', updateCanHover);
      } else {
        mediaQueryWithLegacyApi.removeListener?.(updateCanHover);
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

  function handleOpenChange(nextOpen: boolean) {
    clearCloseTimer();
    setOpen(nextOpen);
  }

  return (
    <span className={cn('inline', className)}>
      <span>{children}</span>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-describedby={tooltipId}
            aria-label="용어 설명 열기"
            aria-expanded={open}
            onPointerEnter={canHover ? openPopover : undefined}
            onPointerLeave={canHover ? scheduleClose : undefined}
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
          onPointerEnter={canHover ? openPopover : undefined}
          onPointerLeave={canHover ? scheduleClose : undefined}
          className="w-72 max-w-[calc(100vw-2rem)] px-3 py-2 text-left text-sm leading-5"
        >
          {description}
        </PopoverContent>
      </Popover>
    </span>
  );
}
