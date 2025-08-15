import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      tier: string
      isFounder: boolean
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    tier: string
    isFounder: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    tier: string
    isFounder: boolean
  }
}