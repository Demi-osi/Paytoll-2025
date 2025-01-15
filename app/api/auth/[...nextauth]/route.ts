import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const { 
  handlers: { GET, POST }, 
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>) {
        
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;

        
        const user = await prisma.users.findUnique({
          where: { email }
        });

        if (!user) {
          return null;
        }

        
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isPasswordValid) {
          return null;
        }

        
        //console.log("It works");
        //return user;
        return {
          id: user.id,
          email: user.email,
          firstName: user.first_name, // Renamed field
          lastName: user.last_name, // Renamed field
          balance: user.balance?.toNumber() || 0, // Handle Decimal to number
          address: user.address,
          role: user.role ?? "user",
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: {token: any; user: any}) {
      /*
      async jwt({ token, user, trigger, session }: {token: any; user: any; trigger?: "signIn" | "signUp" | "update"; session?: any}) {
      if (trigger === 'update') {
        return {
          ...token,
          ...session.user
        };
      }*/
      // Add user details to the token on sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.balance = user.balance;
        token.firstName = user.firstName; // Exactly matching database column
        token.lastName = user.lastName; 
        token.address = user.address;
        token.role = user.role;
      }
      //console.log('Token in jwt callback:', token);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Add user details to the session
      session.user = {
        id: token.id as string,
        email: token.email as string,
        balance: token.balance as number,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        address: token.address as string,
        role: token.role as string
      };
      //console.log('Session in session callback:', session);
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
});

