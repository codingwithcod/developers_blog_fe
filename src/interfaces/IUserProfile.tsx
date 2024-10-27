export interface IUserProfile {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  profilePic?: string;
  followers: number;
  isFollowed?: boolean;
  createdAt: string;
  updatedAt: string;
}
