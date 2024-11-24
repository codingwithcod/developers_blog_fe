import ProfileForm from "./ProfileForm";
import { auth } from "@/auth";
import { axiosClient } from "@/utils/axiosClient";
import apiEndpoints from "@/api/apiEndpoints";
import { IUserProfile } from "@/interfaces/IUserProfile";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";

const Update = async () => {
  const session = await auth();

  try {
    if (!session?.user) throw new Error("Session not found.");
    const res = await axiosClient.get(
      apiEndpoints.user.getProfileByUserName(session.user.username)
    );
    const profile = res.data.profile as IUserProfile;

    return (
      <div className="container flex min-h-[90vh] flex-col py-16 md:w-[70%] lg:w-[50%]">
        {/* ---> Update form */}
        <ProfileForm
          profile={profile}
          username={session.user.username}
        />
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

export default Update;
