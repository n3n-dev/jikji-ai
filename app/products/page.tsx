import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { I18nProvider } from '@/components/i18n-provider';
import { ProductCatalog } from './product-catalog';

export const metadata: Metadata = {
  title: 'Products',
  description: '직지랩스의 AI 클라우드, 플랫폼, 인프라 제품 카탈로그입니다.',
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-[#0E0E10] selection:bg-white/30">
        <Header />
        <ProductCatalog />
        <Footer />
      </main>
    </I18nProvider>
  );
}
