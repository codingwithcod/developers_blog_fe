export interface IUserProfile {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
  bio?: string;
  followers: number;
  isFollowed?: boolean;
  createdAt: string;
  updatedAt: string;
}
