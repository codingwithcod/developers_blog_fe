"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // console.log("result ------->", result);

    if (result?.error) {
      // console.error("Login failed:", result.error);
    } else {
      // Redirect after successful login
      router.push("/");
    }
  };

  return (
    <div className="container mb-20 mt-40 flex justify-center">
      <Card className="w-[400px] border-muted-foreground/50 bg-background p-5 text-foreground backdrop:blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Developers blog</CardTitle>
          <CardDescription className="tracking-wider">Sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCredentialSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  className="border-muted-foreground focus:border-muted"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="border-muted-foreground focus:border-muted"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Or Signin with</p>
          <Button
            variant={"outline"}
            className="w-full gap-3"
          >
            <FcGoogle className="text-lg" /> Google
          </Button>
          <Button
            variant={"outline"}
            className="w-full gap-3"
          >
            <FaGithub className="text-lg" /> Github
          </Button>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account ?{" "}
            <Link
              href={"/auth/signup"}
              className="text-primary-foreground"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
