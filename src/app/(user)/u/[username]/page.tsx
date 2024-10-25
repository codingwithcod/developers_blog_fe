import SignOutButton from "@/components/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { FC } from "react";
import { auth } from "@/auth";
import { BsThreeDots } from "react-icons/bs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import MyBlogs from "./MyBlogs";

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = async ({ params: { username } }) => {
  const session = await auth();
  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith("@")) {
    return notFound();
  }

  return (
    <div className="container flex h-full pt-16 sm:px-5 md:px-10 lg:px-20">
      {/* ---> Left side */}
      <div className="flex h-full w-full flex-col md:w-[75%] md:pr-20">
        {/* ---> Header */}
        <div className="border-b border-muted-foreground/20 py-10">
          {/* ---> For large screens header */}
          <div className="hidden items-center justify-between md:flex">
            <span className="text-4xl font-semibold tracking-wide">{session?.user?.name}</span>
            <BsThreeDots className="text-xl" />
          </div>
          {/* ---> For small screens header */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-5">
              <Avatar className="h-16 w-16">
                <AvatarImage src={session?.user?.image ?? ""} />
                <AvatarFallback className="bg-indigo-500 text-2xl font-bold capitalize text-white">
                  {session?.user?.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold tracking-wider sm:text-2xl">
                  {session?.user?.name}
                </h2>
                <p className="text-muted-foreground">552 Followers</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={"outline"}
                className="rounded-full"
              >
                Follow
              </Button>
              <BsThreeDots className="text-xl" />
            </div>
          </div>
        </div>
        {/* ---> Body */}
        <MyBlogs />
      </div>

      {/* ---> Right side */}
      <div className="sticky top-16 hidden h-[90vh] w-[25%] flex-col gap-3 border-l border-muted-foreground/20 p-5 md:flex lg:p-10">
        <Avatar className="h-20 w-20">
          <AvatarImage src={session?.user?.profilePic ?? ""} />
          <AvatarFallback className="bg-indigo-500 text-2xl font-bold capitalize text-white">
            {session?.user?.firstName?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium tracking-wider text-foreground">
            {session?.user?.firstName} {session?.user?.lastName}
          </h2>
          <p className="text-muted-foreground">552 Followers</p>
          <p className="text-muted-foreground">Creator, Software Engineer, Traveller.</p>
          <div>
            <Button
              variant={"outline"}
              className="rounded-full"
            >
              Follow
            </Button>
          </div>
        </div>
        <div className="flex h-full items-end justify-between">
          <SignOutButton />
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;
