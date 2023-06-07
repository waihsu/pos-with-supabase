import { config } from "@/config/config";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";
import { supabase } from "@/libs/supabase";

// import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: `${config.githubID}`,
      clientSecret: `${config.githubKEY}`,
    }),
    GoogleProvider({
      clientId: `${config.googleId}`,
      clientSecret: `${config.googleSecret}`,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        const {
          data: { user },
        } = await supabase.auth.signInWithPassword({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });
        if (user) {
          return user;
        }
        return null;
      },
    }),

    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        //@ts-ignore
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      //@ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: `${config.jwtSecret}`,
};

export default NextAuth(authOptions);
