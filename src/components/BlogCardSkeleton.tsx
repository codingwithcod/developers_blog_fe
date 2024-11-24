import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="w-full border-none bg-background text-foreground shadow-none">
      {/* ---> Thumbnail  */}
      <div className="overflow-hidden rounded-lg">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </div>

      {/* ---> Card footer  */}
      <div className="flex gap-3 py-2">
        {/* ---> Avatar  */}
        <div className="flex items-start gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
        {/* ---> Title and user name  */}
        <div className="w-full space-y-3">
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
