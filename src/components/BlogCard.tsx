"use client";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/utils/timeAgo";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IBlog } from "@/interfaces/IBlog";
import { FC, MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AspectRatio } from "./ui/aspect-ratio";
import OptionDropdown from "./OptionDropdown";

interface IProps {
  blog: IBlog;
}

const BlogCard: FC<IProps> = ({ blog }) => {
  const router = useRouter();
  const {
    _id: blogId,
    title,
    slug,
    thumbnail,
    reads,
    createdAt,
    user: { firstName, lastName, username, profilePic },
  } = blog;
  const [isOptionDropdown, setIsOptionDropdown] = useState(false);

  const handleOptionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOptionDropdown((prev) => !prev);
  };

  const handleNavigateToProfile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(`/u/@${username}`);
  };

  return (
    <Link href={`/blogs/${slug}`}>
      <Card className="w-full border-none bg-background text-foreground shadow-none">
        {/* ---> Thumbnail  */}
        <div className="overflow-hidden rounded-lg">
          <AspectRatio
            ratio={16 / 9}
            className="z-0"
          >
            <Image
              src={thumbnail}
              alt={title}
              width={450}
              height={300}
              className="z-0 w-full object-contain"
            />
          </AspectRatio>
        </div>

        {/* ---> Card footer  */}
        <div className="flex gap-3 py-2">
          {/* ---> Avatar  */}
          <div className="flex items-start gap-3">
            <button onClick={handleNavigateToProfile}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={profilePic} />
                <AvatarFallback>{firstName.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </button>
          </div>
          {/* ---> Title and user name  */}
          <div className="w-full font-sans">
            <div className="flex">
              <CardTitle className="line-clamp-2 w-full leading-5">{title}</CardTitle>
              {/* ---> Options three dots  */}
              <div className="relative translate-x-2 justify-self-end">
                <Button
                  onClick={handleOptionClick}
                  className="h-10 w-10 rounded-full bg-background text-muted-foreground shadow-none hover:bg-muted"
                >
                  <BsThreeDotsVertical className="absolute text-lg" />
                </Button>
                {isOptionDropdown && (
                  <OptionDropdown
                    blogId={blogId}
                    isReadLater={blog?.isReadLater ?? false}
                    onClose={() => setIsOptionDropdown(false)}
                  />
                )}
              </div>
            </div>
            <div className="mt-2 text-muted-foreground">
              <button
                onClick={handleNavigateToProfile}
                className="pr-2"
              >
                <p className="text-sm font-medium">
                  {firstName} {lastName}
                </p>
              </button>
              <div className="flex items-center text-sm">
                <p className="text-nowrap">{reads}K reads</p>
                <DotFilledIcon />
                <p className="text-nowrap">{timeAgo(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
