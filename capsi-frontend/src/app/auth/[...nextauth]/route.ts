
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_CLIENT_ID as string,
      clientSecret: process.env.NEXT_CLIENT_SECRET as string,
      checks:['none']
    }),
  
  ],
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", 
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
