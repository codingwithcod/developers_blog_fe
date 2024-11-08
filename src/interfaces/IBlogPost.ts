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
    isLiked: boolean;
  };
  likes: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  status: "draft" | "published";
  reads: number;
  createdAt: string;
  updatedAt: string;
}
