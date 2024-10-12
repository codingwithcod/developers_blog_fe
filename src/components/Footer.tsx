import Link from "next/link";
import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="container gap-2 sm:flex-row sm:px-5 sm:py-0 md:px-10 lg:px-20">
      {/* ---> Large screen devices  */}
      <div className="hidden h-16 items-center justify-between border-t border-muted-foreground/20 sm:flex">
        {/* ---> Logo Developers Blog */}
        <div className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
          <div className="h-0 w-0 border-b-[20px] border-l-[10px] border-r-[10px] border-b-foreground border-l-transparent border-r-transparent"></div>
          <Link
            href={"/"}
            className="text-muted-foreground"
          >
            Developers Blog
          </Link>
        </div>

        {/* ---> Copy right */}
        <div className="flex items-center gap-1">
          <FaRegCopyright className="text-sm text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Developers Blog
          </p>
        </div>

        {/* ---> Developed by TheAbhiPatel */}
        <DevelopedBy />
      </div>

      {/* ---> Mobile devices  */}
      <div className="flex flex-col items-center gap-4 border-t border-muted-foreground/20 py-3 sm:hidden">
        {/* ---> Logo Developers Blog */}
        <div className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
          <div className="h-0 w-0 border-b-[20px] border-l-[10px] border-r-[10px] border-b-foreground border-l-transparent border-r-transparent"></div>
          <Link
            href={"/"}
            className="text-muted-foreground"
          >
            Developers Blog
          </Link>
        </div>

        {/* ---> Developed by TheAbhiPatel */}
        <DevelopedBy />

        {/* ---> Copy right */}
        <div className="flex items-center gap-1 border-t border-muted-foreground/20 pt-2">
          <FaRegCopyright className="text-xs text-muted-foreground" />
          <p className="text-xs text-muted-foreground/80">
            {new Date().getFullYear()} Developers Blog | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const DevelopedBy = () => {
  return (
    <div className="flex flex-col">
      <span className="text-xs leading-none text-muted-foreground/70">Developed by</span>
      <Link
        href={"https://www.theabhipatel.com/"}
        target="_blank"
      >
        <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-lg font-semibold leading-none tracking-wide text-transparent">
          TheAbhiPatel
        </span>
      </Link>
    </div>
  );
};
