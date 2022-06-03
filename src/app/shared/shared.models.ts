export class User {
  id!: number | null;
  username!: string;
  email!: string;
  avatar?: string | null;
  bio?: number;
}

export class Recipe {
  id!: number | null;
  name!: string;
  description!: string;
  ingredients!: string;
  directions!: string;
  cook_time!: number | null;
  user!: User;
  image: any;
}
