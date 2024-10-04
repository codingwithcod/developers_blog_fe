import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 mx-auto w-full border-b border-gray-200/10 bg-slate-800/50 backdrop-blur-md">
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
            {session?.user ? (
              <Link href={"/new-blog"}>Write</Link>
            ) : (
              <Link href={"/auth/signin"}>Login</Link>
            )}
          </nav>
          <div>
            {session && (
              <Link href={"/u/@theabhipatel"}>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session.user?.image ?? ""} />
                  <AvatarFallback className="bg-background bg-indigo-500 font-bold capitalize">
                    {session.user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
