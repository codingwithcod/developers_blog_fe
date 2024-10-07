import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="flex h-[18rem] w-full flex-col items-center gap-2 pt-52 text-center sm:h-[25rem]">
      <h1 className="text-4xl font-semibold sm:text-5xl md:text-7xl">Developers Blog</h1>
      <p className="text-[10px] tracking-[0.34em] sm:text-sm md:text-lg">
        For Developers by Developers
      </p>

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
    </section>
  );
};

export default HeroSection;
