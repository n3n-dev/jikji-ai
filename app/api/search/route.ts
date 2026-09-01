import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import { koreanTokenizer } from '@/lib/korean-tokenizer';

export const revalidate = false;
export const { staticGET: GET } = createFromSource(source, {
  tokenizer: koreanTokenizer,
});
