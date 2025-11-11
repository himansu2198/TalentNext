import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const simpleAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "mock-google-client-id",
      clientSecret: "mock-google-client-secret",
    }),
    GitHubProvider({
      clientId: "mock-github-client-id",
      clientSecret: "mock-github-client-secret", 
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
}
