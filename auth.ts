import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Token',
      credentials: {
        token: { label: "Token", type: "text" }
      },
      async authorize(credentials) {
        console.log("credentials", credentials)
        if (!credentials?.token) {
          return null
        }

        try {
          return {
            id: '1',
            name: 'User Name',
            email: 'user@example.com',
            accessToken: credentials.token,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          teamId: token.teamId,
          permissions: token.permissions,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        error: token.error,
      }
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: true,
}