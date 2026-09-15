'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useI18n } from '@/components/i18n-provider';
import styles from './coming-soon.module.css';

export function BlogComingSoon() {
  const { locale } = useI18n();
  const isKorean = locale === 'ko';
  const [paused, setPaused] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="flex min-h-[80svh] items-center justify-center px-6 pb-20 pt-36 sm:pt-44">
        <div className="mx-auto w-full max-w-2xl text-center">
          <button
            type="button"
            className={`${styles.folder} mx-auto mb-6 block size-40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-52`}
            data-paused={paused}
            onClick={() => setPaused(!paused)}
            aria-label={
              isKorean
                ? '문서 애니메이션 일시 정지'
                : 'Pause document animation'
            }
            aria-pressed={paused}
          >
            <Image
              src="/images/blog-labs-folder.png"
              alt=""
              width={208}
              height={208}
              priority
              className={`${styles.folderBase} size-full object-contain`}
            />
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className={styles.document}
                data-sheet={index}
                style={{ animationDelay: `${index * 2 - 4}s` }}
                aria-hidden="true"
              />
            ))}
            <span className={styles.folderCover} aria-hidden="true" />
          </button>
          <h1 className="text-[23px] font-semibold leading-snug tracking-tight [word-break:keep-all]">
            {isKorean ? '직지랩스 블로그 준비 중' : 'Our blog is coming soon'}
          </h1>
          <p
            className={`mx-auto mt-3 ${isKorean ? 'max-w-md' : 'max-w-2xl'} text-[16px] leading-relaxed text-white/70 [word-break:keep-all]`}
          >
            {isKorean
              ? '직지랩스의 AI 기술과 새로운 소식을 이곳에서 전해드릴게요.'
              : 'Discover AI technology and the latest news from JIKJI Labs here.'}
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            {isKorean ? '홈으로 돌아가기' : 'Back to home'}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
