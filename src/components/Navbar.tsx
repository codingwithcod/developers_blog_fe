import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";
import NavbarMobileMenu from "./NavbarMobileMenu";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 mx-auto w-full border-b border-muted-foreground/10 bg-background/50 text-foreground backdrop-blur-xl">
      <div className="container flex h-16 w-full justify-between sm:px-5 md:px-10 lg:px-20">
        {/* ---> Logo Developers Blog */}
        <div className="flex items-center text-xl font-semibold md:text-3xl">
          <Link href={"/"}>Developers Blog</Link>
        </div>

        {/* ---> Search bar */}
        <div className="hidden items-center md:flex">
          <div className="flex h-9 w-52 items-center rounded-full border border-gray-200/20 px-5">
            <p className="select-none text-sm text-muted-foreground/50">Search for anything..</p>
          </div>
        </div>

        <div className="flex gap-3">
          {/* ---> Navlinks and profile */}
          <div className="flex items-center gap-5">
            <nav className="hidden items-end gap-5 text-sm text-foreground sm:flex">
              <Link href={"/blogs"}>Blogs</Link>
              {session?.user ? (
                <Link href={"/new-blog"}>Write</Link>
              ) : (
                <Link href={"/auth/signin"}>Login</Link>
              )}
            </nav>
            <div>
              {session && (
                <Link href={`/u/@${session.user.username}`}>
                  <Avatar className="h-7 w-7 md:h-9 md:w-9">
                    <AvatarImage src={session.user?.profilePic ?? ""} />
                    <AvatarFallback className="bg-indigo-500 font-roboto font-bold capitalize text-white">
                      {session.user?.firstName?.slice(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              )}
            </div>
          </div>

          {/* ---> Mobile Navbar */}
          <div className="flex items-center justify-center md:hidden">
            <NavbarMobileMenu session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
