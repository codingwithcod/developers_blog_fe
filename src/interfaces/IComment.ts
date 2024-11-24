export interface IComment {
  _id: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePic?: string;
  };
  blog: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
