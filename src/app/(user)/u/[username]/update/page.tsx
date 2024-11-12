import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import ProfileForm from "./ProfileForm";

const Update = () => {
  return (
    <div className="container flex min-h-[90vh] flex-col py-16 md:w-[70%] lg:w-[50%]">
      <div className="flex h-32 w-full justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-24 w-24">
            <AvatarImage src={""} />
            <AvatarFallback className="select-none bg-indigo-500 text-2xl font-bold capitalize text-white">
              {/* {profile.firstName?.slice(0, 1)} */}A
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold tracking-wider sm:text-2xl">
              {/* {profile.firstName} {profile.lastName} */}
              Abhi Patel
            </h2>
            <p className="text-muted-foreground">abhi@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BsThreeDots className="text-xl" />
        </div>
      </div>

      {/* ---> Update form */}
      <ProfileForm />
    </div>
  );
};

export default Update;
