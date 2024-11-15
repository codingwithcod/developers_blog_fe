"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { FC, useRef, useState } from "react";
import { IUserProfile } from "@/interfaces/IUserProfile";
import { errorLog } from "@/utils/errorLog";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(50, { message: "First Name must contain at most 50 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters." })
    .max(50, { message: "Last Name must contain at most 50 characters" }),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters." })
    .max(100, { message: "Bio must contain at most 100 characters" }),
});

interface IProps {
  profile: IUserProfile;
  username: string;
}

const ProfileForm: FC<IProps> = ({ profile, username }) => {
  const router = useRouter();
  const { firstName, lastName, bio, profilePic } = profile;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [message, setMessage] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName,
      lastName,
      bio,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await axiosClient.patch(apiEndpoints.user.updateUserProfile, {
        ...values,
        profilePic,
      });
      toast({
        title: "Profile updated successfully.",
      });
      router.push(`/u/@${username}`);
    } catch (error) {
      errorLog(error);
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Profile not udpated !!",
          description: "Something went wrong, please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelectOpen = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  // [::] TODO : Need to clear this function with validation and perfetc UI.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        setMessage("Please select a valid image file.");
        return;
      }
      if (selectedFile.size > 1 * 1024 * 1024) {
        // 1 MB limit
        setMessage("File size exceeds 1 MB.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadImage = async () => {
    if (!file) return;
    setUploadingProfilePic(true);
    try {
      const res = await axiosClient.get("/user/profile/upload/profile-picture");
      const data = res.data;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("public_id", data.public_id);
      formData.append("signature", data.signature);
      formData.append("timestamp", data.timestamp.toString());
      formData.append("api_key", data.api_key);

      const cloudinaryRes = await axios.post(data.upload_url, formData);

      await axiosClient.patch(apiEndpoints.user.updateUserProfile, {
        profilePic: cloudinaryRes.data.secure_url,
      });
      toast({
        title: "Profile updated successfully.",
      });
      setFile(null);
    } catch (error) {
      errorLog(error);
    } finally {
      setUploadingProfilePic(false);
    }
  };

  return (
    <>
      <div className="flex h-32 w-full justify-between">
        <div className="flex items-center gap-5">
          <Avatar
            onClick={handleImageSelectOpen}
            className="h-24 w-24"
          >
            <AvatarImage src={profile.profilePic} />
            <AvatarFallback className="select-none bg-indigo-500 text-2xl font-bold capitalize text-white">
              {profile.firstName?.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-semibold tracking-wider sm:text-2xl">
              {profile.firstName} {profile.lastName}
            </h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BsThreeDots className="text-xl" />
        </div>
      </div>

      {/* ---> Uploading image */}
      <div>
        <h2>Upload Profile Picture</h2>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUploadImage}
          disabled={uploadingProfilePic}
        >
          {uploadingProfilePic ? "Uploading..." : "Upload"}
        </button>

        <p className="text-red-500">{message}</p>
      </div>

      <div className="flex h-full w-full flex-col gap-4 rounded-md border p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      {...field}
                      className="border-muted-foreground/40 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      {...field}
                      className="border-muted-foreground/40 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={profile.email}
                disabled
                className="mt-2 border-muted-foreground/40 focus:border-primary"
              />
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your message here."
                      className="border-muted-foreground/40 focus:border-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end gap-5">
              <Button
                variant={"outline"}
                type="button"
                className="rounded-full"
                onClick={() => router.push(`/u/@${username}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-28 rounded-full"
              >
                {isSubmitting ? "Updating ..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ProfileForm;
