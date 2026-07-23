import type { Metadata } from 'next';
import './globals.css'; // Global styles
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Providers } from '@/components/providers';
import { GoToTopButton } from '@/components/go-to-top-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'JIKJI',
    template: '%s | JIKJI',
  },
  description:
    'Accelerate Your AI Solutions with N3N. 복잡한 인프라 관리 없이 데이터센터부터 AI 서비스까지 한 번에 구축하세요.',
  keywords: [
    'AI',
    'Machine Learning',
    'GPU Cloud',
    'MLOps',
    'AI Infrastructure',
    'N3N',
    'JIKJI',
    'AI 데이터센터',
    'GPUaaS',
    'AI Platform',
  ],
  authors: [{ name: 'JIKJI AI' }],
  creator: 'JIKJI AI',
  publisher: 'JIKJI AI',
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      ko: '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: ['en_US'],
    siteName: 'JIKJI AI',
    title: 'JIKJI AI - AI 솔루션 가속화 플랫폼',
    description:
      'Accelerate Your AI Solutions with N3N. 복잡한 인프라 관리 없이 데이터센터부터 AI 서비스까지 한 번에 구축하세요.',
    images: [
      {
        url: './jikji_og_image.png',
        width: 1200,
        height: 630,
        alt: 'JIKJI AI Platform - AI 솔루션 가속화',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JIKJI AI - AI 솔루션 가속화 플랫폼',
    description: 'Accelerate Your AI Solutions with N3N',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo_jikji.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  verification: {
    other: {
      'naver-site-verification': '8c3b171d238ec6e4b4df0343e961ed2f5afc29ac',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} dark overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="bg-[#01071B] text-white antialiased font-sans selection:bg-white/30 overflow-x-hidden">
        {/* Umami analytics */}
        <Script
          src="https://umami.n3n.ai/script.js"
          data-website-id="a348eb51-bf3d-43f8-830a-594ba035c4ed"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
        <GoToTopButton />
        {/* Figma capture script — remove after handoff */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          async
        ></script>
      </body>
    </html>
  );
}
