"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
import { toast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
    if (result?.error) {
      toast({
        title: "Login field !!",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    const result = await signIn("google", { redirectTo: "/" });
    if (result?.error) {
      toast({
        title: "Login field !!",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGithubLogin = async () => {
    const result = await signIn("github", { redirectTo: "/" });
    if (result?.error) {
      toast({
        title: "Login field !!",
        description: "Something went wrong, please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center py-20 sm:px-5 md:px-10 lg:px-20">
      <Card className="w-full border-muted-foreground/30 bg-background text-foreground backdrop:blur-sm sm:w-[400px] sm:p-5">
        <CardHeader className="text-center">
          <Link href={"/"}>
            <CardTitle className="text-2xl">Developers blog</CardTitle>
          </Link>
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
                  className="border-muted-foreground/40 focus:border-primary"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  className="border-muted-foreground/40 focus:border-primary"
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
            type="button"
            variant={"outline"}
            className="w-full gap-3"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="text-lg" /> Google
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="w-full gap-3"
            onClick={handleGithubLogin}
          >
            <FaGithub className="text-lg" /> Github
          </Button>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account ?{" "}
            <Link
              href={"/auth/signup"}
              className="font-semibold text-muted-foreground duration-300 hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
