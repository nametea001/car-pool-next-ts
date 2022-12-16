import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const url = `http://localhost:3000/api/login`;
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
        const user = data;
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});
