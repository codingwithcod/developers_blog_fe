import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 mx-auto w-full border-b border-gray-200/10 bg-slate-800/50 backdrop-blur-md">
      <div className="container flex h-16 w-full justify-between">
        <div className="flex items-center text-3xl font-semibold">
          <Link href={"/"}>Developers Blog</Link>
        </div>

        <div className="flex items-center">
          <div className="flex h-9 w-52 items-center rounded-full border border-gray-200/20 px-5">
            <p className="select-none text-sm text-gray-300/40">Search for anything..</p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <nav className="flex items-end gap-5 text-sm text-primary-foreground">
            <Link href={"/blogs"}>Blogs</Link>
            <Link href={"/category"}>Category</Link>
            <Link href={"/new-blog"}>Write</Link>
          </nav>
          <div>
            <div className="h-9 w-9 rounded-full border border-gray-200/50"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
