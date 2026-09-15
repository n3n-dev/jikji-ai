import type { Metadata } from 'next';
import { I18nProvider } from '@/components/i18n-provider';
import { BlogComingSoon } from './coming-soon';

export const metadata: Metadata = {
  title: '직지랩스 블로그 준비 중',
  description: '직지랩스의 AI 기술과 새로운 소식을 이곳에서 전해드릴게요.',
  alternates: { canonical: '/blog/', languages: { ko: '/blog/', en: '/blog/' } },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function BlogPage() {
  return (
    <I18nProvider>
      <BlogComingSoon />
    </I18nProvider>
  );
}
