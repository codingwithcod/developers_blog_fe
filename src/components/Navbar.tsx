import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="container flex justify-between bg-slate-800">
      <div className="text-2xl font-semibold">Developers Blog</div>
      <nav className="flex items-end gap-5 text-sm text-primary-foreground">
        <Link href={"/"}>Home</Link>
        <Link href={"/blogs"}>Blogs</Link>
        <Link href={"/category"}>Category</Link>
        <Link href={"/about"}>About</Link>
      </nav>
    </header>
  );
};

export default Navbar;
