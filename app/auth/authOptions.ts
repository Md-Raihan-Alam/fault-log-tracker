import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id); // Ensure id is a string
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user = {
          ...session.user,
          id: String(token.id), // Ensure id is a string
        };
      }
      return session;
    },
  },
};

export default authOptions;
