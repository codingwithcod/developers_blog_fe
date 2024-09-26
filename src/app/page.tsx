import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="container min-h-dvh w-full bg-background">
      <div className="mt-52 flex h-dvh w-full flex-col items-center gap-2">
        <h1 className="text-7xl font-semibold">Developers Blog</h1>
        <p className="text-lg tracking-[0.34em]">For Developer by Developer</p>

        <div className="mt-10 flex gap-4">
          <Link href={"/blogs"}>
            <Button
              variant={"secondary"}
              className="rounded-full"
              role="link"
            >
              Read Blogs
            </Button>
          </Link>

          <Button
            variant={"outline"}
            className="rounded-full"
          >
            Search Blogs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
