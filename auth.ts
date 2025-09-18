import NextAuth, { User } from 'next-auth';
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { Google } from '@mui/icons-material';
import GoogleProvider from 'next-auth/providers/google';
// Create a Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Missing credentials
        }
<<<<<<< HEAD

=======
>>>>>>> origin/master
        try {
          // Call the Convex query directly using the HTTP client
          const user = await convex.query(api.user.getUserByEmail, {
            email: credentials.email.toString(),
          });

          if (!user) {
            return null; // No user found
          }

          // Compare the provided password with the hashed password
          const isPasswordValid = await compare(
            credentials.password.toString(),
            user.password
          );

          if (!isPasswordValid) {
            return null; // Invalid password
          }

          // Return the user object in the required format
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username, // Adjust based on your schema
          } as User;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: 'en/sign-in', // Ensure this matches your sign-in page path
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to "/en" after successful sign-in
      return `${baseUrl}/en`;
    },
  },
});
