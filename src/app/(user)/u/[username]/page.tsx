"use client";
import SignOutButton from "@/components/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { FC } from "react";
import { blogs as constantBlogs } from "@/constant/blogs";
import { IBlog } from "@/interfaces/blog";
import BlogCard from "@/components/BlogCard";

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = ({ params: { username } }) => {
  const decodedUsername = decodeURIComponent(username);

  const { data: session } = useSession();

  if (!decodedUsername.startsWith("@")) {
    return notFound();
  }

  const localBlogs = [
    ...(JSON.parse(localStorage.getItem("blogs") ?? "[]") as IBlog[]),
    ...constantBlogs,
  ] as IBlog[];

  return (
    <div className="container flex h-full pt-16">
      {/* ---> Left side */}
      <div className="flex h-full w-[70%] flex-col pr-20">
        {/* ---> Header */}
        <div className="border-b py-10">
          <span className="text-4xl font-semibold tracking-wide">{session?.user?.name}</span>
        </div>
        {/* ---> Body */}

        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 md:grid-cols-3">
          {localBlogs.map((blog) => {
            return (
              <BlogCard
                blog={blog}
                key={blog.id}
              />
            );
          })}
        </div>
      </div>
      {/* ---> Right side */}
      <div className="sticky top-16 flex h-[90vh] w-[30%] flex-col gap-3 border-l border-border/70 p-10">
        <Avatar className="h-20 w-20 border">
          <AvatarImage src={session?.user?.image ?? ""} />
          <AvatarFallback className="bg-background text-2xl font-bold capitalize text-orange-500">
            {session?.user?.name?.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium tracking-wider text-foreground">{session?.user?.name}</h2>
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
        <div className="flex h-full items-end">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
};

export default Profile;

/** ---> Previous code for this file for future use */
{
  /* <div className="flex flex-col items-center gap-4">
<h1 className="text-2xl font-semibold tracking-widest">Welcome</h1>
<p className="text-4xl font-bold">{session?.user?.name}</p>

<SignOutButton />
</div> */
}
