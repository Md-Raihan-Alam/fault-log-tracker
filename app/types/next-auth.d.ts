// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the user ID to the session object
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
