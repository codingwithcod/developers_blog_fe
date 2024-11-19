import SignOutButton from "@/components/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";
import { auth } from "@/auth";
import { BsThreeDots } from "react-icons/bs";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import MyBlogs from "./MyBlogs";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { IUserProfile } from "@/interfaces/IUserProfile";
import FollowButton from "@/components/FollowButton";
import { MdEmail } from "react-icons/md";
/** ---> Hover card imports */
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
import { Metadata } from "next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "User Profile",
  description: "See your profile what you can do here.",
};

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = async ({ params: { username } }) => {
  const session = await auth();
  const decodedUsername = decodeURIComponent(username).slice(1);

  const isUserSelf = session?.user.username === decodedUsername;

  try {
    const res = await axiosClient.get(apiEndpoints.user.getProfileByUserName(decodedUsername));
    const profile = res.data.profile as IUserProfile;

    return (
      <div className="container flex h-full pt-16">
        {/* ---> Left side */}
        <div className="flex h-full w-full flex-col md:w-[75%] md:pr-20">
          {/* ---> Header */}
          <div className="border-b border-muted-foreground/20 py-10">
            {/* ---> For large screens header */}
            <div className="hidden items-center justify-between md:flex">
              <span className="text-4xl font-semibold tracking-wide">
                {profile.firstName} {profile.lastName}
              </span>
              <BsThreeDots className="text-xl" />
            </div>
            {/* ---> For small screens header */}
            <div className="flex items-center justify-between md:hidden">
              <div className="flex items-center gap-5">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={profile?.profilePic ?? ""} />
                  <AvatarFallback className="select-none bg-indigo-500 text-2xl font-bold capitalize text-white">
                    {profile.firstName?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold tracking-wider sm:text-2xl">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-muted-foreground">{profile.followers} Followers</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isUserSelf && (
                  <FollowButton
                    followingId={profile.user}
                    isFollowed={profile.isFollowed}
                    session={session}
                  />
                )}
                <BsThreeDots className="text-xl" />
              </div>
            </div>
          </div>
          {/* ---> Body */}
          <div>
            <Tabs
              defaultValue="account"
              className="w-full"
            >
              <TabsList className="my-2">
                <TabsTrigger value="myblogs">My Blogs</TabsTrigger>
                <TabsTrigger value="liked">Liked </TabsTrigger>
                <TabsTrigger value="read-later">Read Later</TabsTrigger>
              </TabsList>
              <hr />
              <TabsContent value="myblogs">
                {" "}
                <MyBlogs userId={profile.user} />
              </TabsContent>
              <TabsContent value="liked">
                <div className="flex h-52 w-full items-center justify-center text-4xl">
                  <p>Liked Blogs</p>
                </div>
              </TabsContent>
              <TabsContent value="read-later">
                {" "}
                <div className="flex h-52 w-full items-center justify-center text-4xl">
                  <p>Read later Blogs</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* ---> Right side */}
        <div className="sticky top-16 hidden h-[90vh] w-[25%] flex-col gap-3 border-l border-muted-foreground/20 p-5 md:flex lg:p-10">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.profilePic ?? ""} />
            <AvatarFallback className="bg-indigo-500 text-2xl font-bold capitalize text-white">
              {profile.firstName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <h2 className="font-medium tracking-wider text-foreground">
                {profile.firstName} {profile.lastName}
              </h2>

              {isUserSelf && (
                <>
                  <HoverCard>
                    <HoverCardTrigger
                      asChild
                      className=""
                    >
                      <div>
                        <p className="line-clamp-1 text-sm text-muted-foreground/60">
                          {profile.email} <span className="invisible">.</span>
                        </p>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">
                            {profile.firstName} {profile.lastName}
                          </h4>
                          <span className="text-xs text-muted-foreground">@{decodedUsername}</span>

                          <div className="flex items-center pt-2">
                            <MdEmail className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-sm text-muted-foreground">{profile.email}</span>
                          </div>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </>
              )}
            </div>

            <p className="text-muted-foreground">{profile.followers} Followers</p>
            <p className="text-muted-foreground">
              {profile.bio ?? "Hey there I am reading dev blogs."}
            </p>
            {isUserSelf && (
              <Link
                href={`/u/@${decodedUsername}/update`}
                className="mt-6 text-sm text-green-400 duration-300 hover:text-muted-foreground"
              >
                Update profile
              </Link>
            )}
            <div>
              {!isUserSelf && (
                <FollowButton
                  followingId={profile.user}
                  isFollowed={profile.isFollowed}
                  session={session}
                />
              )}
            </div>
          </div>
          {isUserSelf && (
            <div className="flex h-full items-end justify-between">
              <SignOutButton />
              <ThemeToggleButton />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    /** ---> If user not found. */
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        return notFound();
      }
    }

    /** ---> If something else error occured. */
    return (
      <div className="container flex min-h-[90vh] flex-col items-center justify-center pb-20 pt-24 text-center sm:px-5 md:px-10 lg:px-20">
        <h1 className="text-lg">Failed to fetch user profile</h1>
        <p className="text-sm text-muted-foreground">
          There was an issue fetching the profile. Please try again later.
        </p>
      </div>
    );
  }
};

export default Profile;
