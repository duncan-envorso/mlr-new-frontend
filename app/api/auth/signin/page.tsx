'use client'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SignIn() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    const handleSignIn = async () => {
      if (token) {
        // Sign in with the token
        const result = await signIn('credentials', {
          token,
          redirect: false,
        })

        if (result?.error) {
          console.error('Sign in error:', result.error)
          // Handle error - maybe redirect to an error page
        } else {
          // Successful sign in - redirect to dashboard or home
          router.push('/')
        }
      }
    }

    handleSignIn()
  }, [token, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Signing you in...</h1>
        <p className="text-gray-600">Please wait while we authenticate you.</p>
      </div>
    </div>
  )
}
