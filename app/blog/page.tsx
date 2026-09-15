import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '직지랩스 블로그',
  description: '직지랩스의 AI 기술과 새로운 소식',
  alternates: { canonical: 'https://blog.jikji.ai/' },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <meta httpEquiv="refresh" content="0;url=https://blog.jikji.ai/" />
      <a href="https://blog.jikji.ai/" className="underline underline-offset-4">
        직지랩스 블로그로 이동 · Visit JIKJI Labs Blog
      </a>
    </main>
  );
}
