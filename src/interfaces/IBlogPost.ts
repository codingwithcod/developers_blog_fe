export interface IBlogPost {
  _id: string;
  user: {
    _id: string;
    email: string;
    userProfile: {
      _id: string;
      user: string;
      firstName: string;
      lastName: string;
    };
    id: string;
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
