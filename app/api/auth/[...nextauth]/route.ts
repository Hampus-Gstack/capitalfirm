import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const providers = []

// Only add Google provider if environment variables are set
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

// Add a simple credentials provider as fallback
providers.push(
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // Simple fallback authentication for testing
      if (credentials?.email && credentials?.password) {
        return {
          id: '1',
          email: credentials.email,
          name: 'Test User'
        }
      }
      return null
    }
  })
)

const handler = NextAuth({
  providers,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return token
    },
    async session({ session, token }) {
      return session
    },
  },
  // Add a secret for JWT signing
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
})

export { handler as GET, handler as POST } 