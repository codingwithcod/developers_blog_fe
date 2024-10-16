import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  AUTH_GITHUB_CLIENT_ID,
  AUTH_GITHUB_SECRET,
  AUTH_GOOGLE_CLIENT_ID,
  AUTH_GOOGLE_SECRET,
} from "@/config";
import { axiosInstance } from "./utils/axiosInstance";
import { AxiosError } from "axios";
import { errorLog } from "./utils/errorLog";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: AUTH_GOOGLE_CLIENT_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    GithubProvider({
      clientId: AUTH_GITHUB_CLIENT_ID,
      clientSecret: AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const res = await axiosInstance.post("/auth/signin", { email, password });
          return { ...res.data.user, accessToken: res.data.accessToken };
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new CredentialsSignin(error.response?.data.message);
          }
          throw new Error("Invalid email or password.");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.email) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.role = user.role;
        token.profilePic = user.profilePic;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      const { _id, firstName, lastName, email, role, profilePic, accessToken } = token;
      session.user._id = _id;
      session.user.firstName = firstName;
      session.user.lastName = lastName;
      session.user.email = email;
      session.user.role = role;
      session.user.profilePic = profilePic;
      session.user.accessToken = accessToken;
      return session;
    },
    signIn: async ({ user, account }) => {
      try {
        if (account?.provider === "google" || account?.provider === "github") {
          const [firstName, lastName] = user.name?.split(" ") as [string, string];
          const res = await axiosInstance.post(`/auth/oauth-signin`, {
            provider: account?.provider,
            providerAccountId: account?.providerAccountId,
            email: user.email,
            firstName,
            lastName,
            profilePic: user.image,
          });

          if (res?.data?.user) {
            user._id = res.data.user._id;
            user.firstName = res.data.user.firstName;
            user.lastName = res.data.user.lastName;
            user.role = res.data.user.role;
            user.profilePic = res.data.user.profilePic;
            user.accessToken = res.data.accessToken;
            return true;
          } else {
            throw new Error("OAuth sign-in failed.");
          }
        }

        return true;
      } catch (error) {
        errorLog(error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
