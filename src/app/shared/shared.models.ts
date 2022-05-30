export interface Recipe {
  id: number | null;
  name: string;
  description: string;
  ingredients: string;
  directions: string;
  imgSrc: string | null;
  cookTime: number;
  user: User;
}

export interface User {
  id: number | null;
  username: string;
  email: string;
  avatar?: string | null;
  bio?: number;
}
