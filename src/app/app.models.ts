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
