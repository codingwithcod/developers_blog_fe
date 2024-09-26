import { notFound } from "next/navigation";
import React, { FC } from "react";

interface IProps {
  params: {
    username: string;
  };
}

const Profile: FC<IProps> = ({ params: { username } }) => {
  const decodedUsername = decodeURIComponent(username);

  if (!decodedUsername.startsWith("@")) {
    return notFound();
  }

  return (
    <div className="flex h-[70vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold tracking-widest">User Profile for</h1>
        <p className="text-4xl font-bold">{decodedUsername}</p>
      </div>
    </div>
  );
};

export default Profile;
