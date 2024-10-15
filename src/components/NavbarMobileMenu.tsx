"use client";
import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { Session } from "next-auth";
import ThemeToggleButton from "./ThemeToggleButton";

interface IProps {
  session: Session | null;
}

const NavbarMobileMenu: FC<IProps> = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleClickOnLink = () => {
    setOpen(false);
  };
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger>
        <Menu className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-card pt-12">
        <SheetHeader className="w-full">
          <SheetTitle className="text-start text-2xl">Developers blog</SheetTitle>
        </SheetHeader>
        <div className="my-1 border-b border-border/50"></div>

        <div className="flex h-full flex-col justify-between">
          <nav className="flex w-full flex-col text-xl">
            <Link
              href={"/blogs"}
              onClick={handleClickOnLink}
              className="rounded-lg px-4 py-4 hover:bg-secondary/40"
            >
              Blogs
            </Link>
            {session?.user ? (
              <>
                <Link
                  href={"/new-blog"}
                  onClick={handleClickOnLink}
                  className="rounded-lg px-4 py-4 hover:bg-secondary/40"
                >
                  Write
                </Link>
                <Link
                  href={"/u/read-later"}
                  onClick={handleClickOnLink}
                  className="rounded-lg px-4 py-4 hover:bg-secondary/40"
                >
                  Read later
                </Link>
                <Link
                  href={"/u/liked-blogs"}
                  onClick={handleClickOnLink}
                  className="rounded-lg px-4 py-4 hover:bg-secondary/40"
                >
                  Liked blogs
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/auth/signin"}
                  onClick={handleClickOnLink}
                  className="rounded-lg px-4 py-4 hover:bg-secondary/40"
                >
                  Login
                </Link>
                <Link
                  href={"/auth/signup"}
                  onClick={handleClickOnLink}
                  className="rounded-lg px-4 py-4 hover:bg-secondary/40"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {session && (
            <div>
              <div className="flex items-center gap-5">
                <Link
                  href={"/u/@theabhipatel"}
                  onClick={handleClickOnLink}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={session.user?.profilePic ?? ""} />
                    <AvatarFallback className="bg-indigo-500 font-roboto text-2xl font-bold capitalize text-white">
                      {session.user?.firstName?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <p className="line-clamp-1 text-xl">
                  {session.user?.firstName} {session.user?.lastName}
                </p>
              </div>
              <hr className="my-3 border-border/50" />
              <div className="flex w-full items-center justify-between">
                <ThemeToggleButton />
                <SignOutButton />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;
