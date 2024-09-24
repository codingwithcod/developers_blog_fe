import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <div className="container w-full bg-black">
      <div className="flex h-dvh w-full flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold">Developers Blog</h1>
        <p className="text-sm tracking-widest">For Developer by Developer</p>

        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Home;
