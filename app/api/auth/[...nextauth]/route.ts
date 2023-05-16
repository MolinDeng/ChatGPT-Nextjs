
import NextAuth, { AuthAction, AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // ...add more providers here
  ],
}

// export default NextAuth(authOptions)

const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST }
