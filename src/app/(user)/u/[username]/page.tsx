"use client";

import SignOutButton from "@/components/SignOutButton";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import React, { FC } from "react";

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = ({ params: { username } }) => {
  const decodedUsername = decodeURIComponent(username);

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session?.user) {
    router.push("/auth/signin");
  }

  if (!decodedUsername.startsWith("@")) {
    return notFound();
  }

  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-widest">Welcome</h1>
        <p className="text-4xl font-bold">{session?.user?.name}</p>

        <SignOutButton />
      </div>
    </div>
  );
};

export default Profile;
