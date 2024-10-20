import { NEXT_PUBLIC_API_BASE_URL } from "@/config";
import axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
});

async function getAuthToken(req?: Request | { headers: Headers | Record<string, string> }) {
  if (typeof window === "undefined" && req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    return token?.accessToken;
  } else {
    const session = await getSession();
    return session?.user?.accessToken;
  }
}

axiosClient.interceptors.request.use(async (req) => {
  const token = await getAuthToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
