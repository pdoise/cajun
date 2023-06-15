export class Recipe {
  id!: number | null;
  name!: string;
  description!: string;
  ingredients!: string;
  directions!: string;
  user!: User | null;
  user_id!: number;
  image!: any;
  image_url?: string;
  comments!: Array<Comment>;
  like_count!: number;
  liking_users_ids!: Array<number>;
  liking_users_names!: Array<string>;
}

export class User {
  id!: number | null;
  first!: string;
  last!: string;
  email!: string;
  avatar?: string | null;
  location?: string;
  bio?: string;
  image_url?: string;
}

export class Comment {
  id!: number;
  content!: string;
  user_id!: number;
  recipe_id!: number;
  created_at!: string;
  updated_at!: string;
  user!: User;
  user_image_url!: string;
}
