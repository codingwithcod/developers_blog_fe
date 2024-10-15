"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          message: "Invalid credentials",
        };
      } else {
        return {
          message: "Something went wrong.",
        };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/auth/signin" });
}
