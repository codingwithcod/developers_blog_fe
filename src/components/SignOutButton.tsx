import React from "react";
import { Button } from "./ui/button";
import { handleSignOut } from "@/actions/authActions";

const SignOutButton = () => {
  return (
    <form action={handleSignOut}>
      <Button
        type="submit"
        size={"sm"}
        variant={"destructive"}
        className="rounded-full"
      >
        Sign out
      </Button>
    </form>
  );
};

export default SignOutButton;
