'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { KoreanSearchDialog } from './search-dialog';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog: KoreanSearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}
