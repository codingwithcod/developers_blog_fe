export interface IBlog {
  _id: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePic: string;
  };
  title: string;
  slug: string;
  thumbnail: string;
  reads: number;
  isReadLater?: boolean;
  status: TBlogStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type TBlogStatus = "published" | "draft";
