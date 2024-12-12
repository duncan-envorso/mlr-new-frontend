// components/providers/providers.tsx
'use client';

import { CartProvider } from '@/components/cart/cart-context';
import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
  cartPromise: any;
}

export default function Providers({ children, cartPromise }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartProvider cartPromise={cartPromise}>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}