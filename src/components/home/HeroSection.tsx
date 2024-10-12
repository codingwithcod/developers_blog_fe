import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex h-[32rem] w-full flex-col items-center gap-2 pt-52 text-center sm:h-[36rem]">
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

      {/* ---> Blue blur effect  */}
      <div className="absolute left-[50%] top-[50%] -z-50 h-36 w-36 -translate-x-[50%] -translate-y-[50%] rounded-full bg-blue-200 blur-[120px] dark:bg-blue-950"></div>
    </section>
  );
};

export default HeroSection;
