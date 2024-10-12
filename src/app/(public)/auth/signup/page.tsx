"use client";
import { useState } from "react";
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
import SuccessAlert from "@/components/SuccessAlert";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export default function SignIn() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password)
      return toast({
        title: "All field Required!!",
        description: "First Name, Last Name, Email and Password are Required to save.",
        variant: "destructive",
        duration: 2000,
      });
    setIsLoading(true);

    try {
      await axiosInstance.post("http://localhost:3331/api/v1/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      setIsSuccessAlert(true);
      window.scrollTo(0, 0);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast({
          title: "Sign up Failed!",
          description: error.response?.data.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex flex-col items-center py-20 sm:px-5 md:px-10 lg:px-20">
      {isSuccessAlert && (
        <div className="my-5">
          <SuccessAlert
            onClose={() => setIsSuccessAlert(false)}
            title="Success"
            description="Your are register with us successfully now you can login to your account."
          />
        </div>
      )}

      <Card className="w-full border-muted-foreground/30 bg-background text-foreground backdrop:blur-sm sm:w-[400px] sm:p-5">
        <CardHeader className="text-center">
          <Link href={"/"}>
            <CardTitle className="text-2xl">Developers blog</CardTitle>
          </Link>
          <CardDescription className="tracking-wider">
            Sign up and create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCredentialSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your Email"
                  className="border-muted-foreground/40 focus:border-primary"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your Email"
                  className="border-muted-foreground/40 focus:border-primary"
                />
              </div>
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
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Or Sign up with</p>
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
            Already have an account ?{" "}
            <Link
              href={"/auth/signin"}
              className="font-semibold text-muted-foreground duration-300 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
