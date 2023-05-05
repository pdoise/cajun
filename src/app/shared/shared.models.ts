export class Recipe {
  id!: number | null;
  name!: string;
  description!: string;
  ingredients!: string;
  directions!: string;
  img_src!: string | null;
  cook_time!: number | null;
  user!: User;
  user_id!: number;
}

export class User {
  id!: number | null;
  username!: string;
  email!: string;
  avatar?: string | null;
  bio?: number;
}
