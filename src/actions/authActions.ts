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
          message: error.message.split("Read")[0],
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

export async function handleGoogleSignin() {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "AccessDenied") {
        return {
          message: "Access Denied you cannot login.",
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

export async function handleGithubSignin() {
  try {
    await signIn("github", { redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "AccessDenied") {
        return {
          message: "Access Denied you cannot login.",
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
