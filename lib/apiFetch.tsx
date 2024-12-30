'use server'

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

const API_URL = process.env.NEXT_API_URL;

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  revalidate?: number;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  const { requireAuth = false, revalidate, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);
  
  if (requireAuth) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.accessToken) {
      throw new Error('Authentication required');
    }
    headers.set('Authorization', `Bearer ${session.user.accessToken}`);
  }

  headers.set('Content-Type', 'application/json');
  
  const config: RequestInit = {
    ...fetchOptions,
    headers,
    next: revalidate ? { revalidate } : undefined
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  const data = await response.json();
  console.log("response",data)
  
 

  return data
}