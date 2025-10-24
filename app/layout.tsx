import './css/style.css';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { getLocale } from 'next-intl/server';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const nacelle = localFont({
  src: [
    {
      path: '../public/fonts/nacelle-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/nacelle-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/nacelle-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/nacelle-semibolditalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-nacelle',
  display: 'swap',
});

export const metadata = {
  title:
    'Full Track Dev - The Full stack developer you need to improve your business',
  description: "I don't just build software, I drive results.",
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
