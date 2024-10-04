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

export default function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);

  const handleCredentialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("user info -->", { firstName, lastName, email, password });
    setIsSuccessAlert(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container my-20 flex flex-col items-center">
      {isSuccessAlert && (
        <div className="my-5">
          <SuccessAlert
            onClose={() => setIsSuccessAlert(false)}
            title="Success"
            description="Your are register with us success fully now you can login to your account."
          />
        </div>
      )}

      <Card className="w-[400px] border-muted-foreground/50 bg-background py-0 text-foreground backdrop:blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Developers blog</CardTitle>
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
                  className="border-muted-foreground focus:border-muted"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your Email"
                  className="border-muted-foreground focus:border-muted"
                />
              </div>
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
                  Sign up
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
              className="text-primary-foreground"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
