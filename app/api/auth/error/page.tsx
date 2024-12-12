// app/auth/error/page.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      console.error('Authentication error:', error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">
          {error === 'CredentialsSignin' 
            ? 'Invalid authentication token. Please try again.'
            : 'An error occurred during authentication.'}
        </p>
      </div>
    </div>
  )
}