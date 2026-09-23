export interface BookComment {
  id: number;
  bookId: number;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  coverUrl: string;
  fileUrl: string;
  price: string;
  categoryId: number;
  categoryName: string;
  rating: number;
  ratingCount: number;
  comments: BookComment[];
}
