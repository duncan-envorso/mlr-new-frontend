'use client';

import React from 'react';

export default function TeamLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
    
      <main className="container mx-auto mt-10 flex-grow p-4 ">{children}</main>
    </div>
  );
}
