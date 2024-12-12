// types/next-auth.d.ts
import "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string
      email?: string
      teamId?: string
      permissions?: string[]
      accessToken?: string
      refreshToken?: string
    } & DefaultSession["user"]
    error?: string
  }

  interface User {
    id: string
    name?: string
    email?: string
    teamId?: string
    permissions?: string[]
    accessToken?: string
    refreshToken?: string
    iat?: number
    exp?: number
  }

  interface JWT {
    id: string
    name?: string
    email?: string
    teamId?: string
    permissions?: string[]
    accessToken?: string
    refreshToken?: string
    iat?: number
    exp?: number
    error?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string
    email?: string
    teamId?: string
    permissions?: string[]
    accessToken?: string
    refreshToken?: string
    iat?: number
    exp?: number
    error?: string
  }
}