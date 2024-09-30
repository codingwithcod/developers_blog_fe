export interface IBlog {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  createdAt: Date;
  reads: number;
  userName: string;
}
