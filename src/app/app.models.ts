export class Recipe {
  id!: number | null;
  name!: string;
  description!: string;
  ingredients!: string;
  directions!: string;
  img_src!: string | null;
  imgsrc!: string | null;
  cook_time!: number | null;
  user!: User | null;
  user_id!: number;
  image!: any;
  image_url!: string;
}

export class User {
  id!: number | null;
  first!: string;
  last!: string;
  email!: string;
  avatar?: string | null;
  location?: string;
}
