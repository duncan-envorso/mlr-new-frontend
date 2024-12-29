// app/layout.tsx
import ClientPopup from '@/components/clientPopUp';
import Header from '@/components/home/Header';
import Footer from '@/components/layout/footer';
import Providers from '@/components/providers/providers';
import { getCart } from '@/lib/shopify';
import { GeistSans } from 'geist/font/sans';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata = {
  title: 'MLR',
  description: 'Major League Rugby',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cartId = cookies().get('cartId')?.value;
  const cartPromise = getCart(cartId);
  
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-slate-100">
        {/* <Script
          id="fastbots-widget"
          src="https://app.fastbots.ai/embed.js"
          data-bot-id="cm3xfybr803lcs5bmv7bymfim"
        /> */}
        <Providers cartPromise={cartPromise}>
          <Header />
          <main className="mt-20">
            <div className="fixed bottom-4 right-4 z-[60]">
              <ClientPopup/>
            </div>
            {children}
          </main>
          <Toaster closeButton />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}