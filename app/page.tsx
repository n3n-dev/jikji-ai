import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { VisionSection } from '@/components/vision-section';
import { ProductsSection } from '@/components/products-section';
import { InfraTeaser } from '@/components/infra-teaser';
import { PricingSnippet } from '@/components/pricing-snippet';
import { Footer } from '@/components/footer';
import { I18nProvider } from '@/components/i18n-provider';
import { ScrollOnMount } from '@/components/scroll-on-mount';

export default function Home() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-black selection:bg-white/30">
        <ScrollOnMount />
        <Header />
        <Hero />
        <VisionSection />
        <ProductsSection />
        <InfraTeaser />
        <PricingSnippet />
        {/* <CTABanner /> */}
        <Footer />
      </main>
    </I18nProvider>
  );
}
