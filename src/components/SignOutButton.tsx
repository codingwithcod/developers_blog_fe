import React from "react";
import { Button } from "./ui/button";
import { handleSignOut } from "@/actions/authActions";

const SignOutButton = () => {
  return (
    <form action={handleSignOut}>
      <Button
        type="submit"
        size={"sm"}
      >
        Sign out
      </Button>
    </form>
  );
};

export default SignOutButton;
