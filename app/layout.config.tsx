import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'JIKJI AI',
  },
  links: [
    {
      text: '홈',
      url: '/',
      active: 'none',
    },
    {
      text: '회사소개',
      url: '/company',
      active: 'none',
    },
    {
      text: '문서',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};
