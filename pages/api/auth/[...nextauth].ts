// import { randomBytes, randomUUID } from "crypto";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  pages: {
    signIn: "login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const host = process.env.NEXTAUTH_URL;
        const url = `${host}/api/login`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
          // headers: {
          //   Accept: "application/json, text/plain, */*",
          //   "Content-Type": "application/json",
          // },
        });
        let data: any;
        try {
          data = await res.json();
        } catch {
          data = null;
        }
        const user = data.user;
        if (res.ok && data.error === false && user) {
          delete user.password;
          return user;
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 6 * 60 * 60, // 5 hours
    // maxAge: 2 * 24 * 60 * 60, // 2 day

    // updateAge: 24 * 60 * 60, // 24 hours
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex");
    // },
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToke;
      session.user = token.user ?? "";
      // session.user = user ?? "";

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // openssl rand -base64 32 //run with linux
});
