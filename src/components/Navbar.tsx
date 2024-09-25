import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 mx-auto w-full border-b border-gray-200/10 bg-slate-800/50 backdrop-blur-md">
      <div className="container flex h-16 w-full justify-between">
        <div className="flex items-center text-3xl font-semibold">
          <Link href={"/"}>Developers Blog</Link>
        </div>
        <nav className="flex items-end gap-5 pb-2 text-sm text-primary-foreground">
          <Link href={"/"}>Home</Link>
          <Link href={"/blogs"}>Blogs</Link>
          <Link href={"/category"}>Category</Link>
          <Link href={"/about"}>About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
