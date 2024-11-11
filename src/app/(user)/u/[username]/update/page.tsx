import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { BsThreeDots } from "react-icons/bs";

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
      <div className="flex h-full w-full flex-col gap-4 rounded-md border p-5">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            // value={slug}
            // onChange={handleSlugChange}
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            // value={slug}
            // onChange={handleSlugChange}
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            value={"abhi@gmail.com"}
            // onChange={handleSlugChange}
            disabled
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>
        <div>
          <Label htmlFor="bio">Short bio</Label>
          <Textarea
            id="bio"
            name="bio"
            placeholder="Type your message here."
            className="border-muted-foreground/40 focus:border-primary"
          />
        </div>

        <div className="flex w-full justify-end gap-5">
          <Button
            variant={"outline"}
            className="rounded-full"
          >
            Cancel
          </Button>
          <Button className="rounded-full">Update</Button>
        </div>
      </div>
    </div>
  );
};

export default Update;
