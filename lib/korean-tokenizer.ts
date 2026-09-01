import type { Tokenizer } from '@orama/orama';

function tokenize(raw: string): string[] {
  if (!raw) return [];
  const tokens = new Set<string>();
  const words = raw.toLowerCase().split(/\s+/).filter(Boolean);

  for (const word of words) {
    // 한국어·영숫자·_만 남김
    const cleaned = word.replace(/[^\w\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g, '');
    if (!cleaned) continue;
    tokens.add(cleaned);

    // 한국어 문자가 포함된 경우 2-gram 추가 (부분 검색 지원)
    if (/[\uAC00-\uD7AF]/.test(cleaned) && cleaned.length > 1) {
      for (let i = 0; i < cleaned.length - 1; i++) {
        tokens.add(cleaned.slice(i, i + 2));
      }
    }
  }
  return Array.from(tokens);
}

export const koreanTokenizer: Tokenizer = {
  language: 'korean',
  normalizationCache: new Map(),
  tokenize,
};
