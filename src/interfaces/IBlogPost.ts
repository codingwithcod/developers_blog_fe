export interface IBlogPost {
  _id: string;
  user: {
    _id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    isFollowed: boolean;
  };
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  status: "draft" | "published";
  reads: string[];
  createdAt: string;
  updatedAt: string;
}
