import { CartProvider } from '@/components/cart/cart-context';
import CartModal from '@/components/cart/modal';
import Header from '@/components/home/Header';
import Footer from '@/components/layout/footer';
import { WelcomeToast } from '@/components/welcome-toast';
import { getCart } from '@/lib/shopify';
import { ensureStartsWith } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description: 'MLR Team Website - Your source for all things rugby',
  robots: {
    follow: true,
    index: true
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = cookies().get('cartId')?.value;
  const cartPromise = getCart(cartId);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <Script
          id="fastbots-widget"
          src="https://app.fastbots.ai/embed.js"
          data-bot-id="cm3xfybr803lcs5bmv7bymfim"
        />
      </head>
      <body className="bg-slate-100">
        <CartProvider cartPromise={cartPromise}>
          <Header />
          <main className="mt-20">
            <div className="fixed bottom-4 right-4 z-[60]">
              <CartModal />
            </div>
            {children}
          </main>
          <Toaster closeButton />
          <WelcomeToast />
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}