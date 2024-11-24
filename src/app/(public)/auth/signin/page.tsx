"use client";
import { useEffect, useState } from "react";
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
import {
  handleCredentialsSignin,
  handleGithubSignin,
  handleGoogleSignin,
} from "@/actions/authActions";
import { useRouter, useSearchParams } from "next/navigation";
import { errorLog } from "@/utils/errorLog";

const SignIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const signinError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Email and Password are required !!",
        description: "Please fill correct email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await handleCredentialsSignin({
        email,
        password,
        redirectTo: searchParams.get("redirectTo") ?? "/",
      });
      if (result?.message) {
        toast({
          title: "Login field !!",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("error login ------>", error); // eslint-disable-line
      toast({
        title: "Login field !!",
        description: "Something went wrong try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    try {
      const result = await handleGoogleSignin({
        redirectTo: searchParams.get("redirectTo") ?? "/",
      });
      if (result?.message) {
        toast({
          title: "Login field !!",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      errorLog(["error google login ------>", error]);
    }
  };

  const handleGithubSubmit = async () => {
    try {
      const result = await handleGithubSignin({
        redirectTo: searchParams.get("redirectTo") ?? "/",
      });
      if (result?.message) {
        toast({
          title: "Login field !!",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      errorLog(["error google login ------>", error]);
    }
  };

  /** ---> If login error then showing toast. */
  useEffect(() => {
    if (signinError) {
      if (signinError === "AccessDenied") {
        toast({
          title: "Login field !!",
          description: "You cannot log in with Google. Please use your credentials.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login field !!",
          description: "An error occurred during sign-in. Please try again.",
          variant: "destructive",
        });
      }
      const newUrl = window.location.pathname;
      router.replace(newUrl);
    }
  }, [signinError]);

  return (
    <div className="container flex flex-col items-center justify-center py-20">
      <Card className="w-full border-muted-foreground/30 bg-background text-foreground backdrop:blur-sm sm:w-[400px] sm:p-5">
        <CardHeader className="text-center">
          <Link href={"/"}>
            <CardTitle className="text-2xl">Developers blog</CardTitle>
          </Link>
          <CardDescription className="tracking-wider">Sign in to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
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
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
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
            onClick={handleGoogleSubmit}
          >
            <FcGoogle className="text-lg" /> Google
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="w-full gap-3"
            onClick={handleGithubSubmit}
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
