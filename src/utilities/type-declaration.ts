import { ObjectId } from 'mongodb';

export type UserState = {
    _id?: ObjectId,
    username: string;
    email: string;
    password: string;
    bookmarks?: object[]; 
  };

export type SetUserType = (user: UserState|null) => void

export type SearchResults = {
  _id: ObjectId,
  recipe: string,
  cuisine: string,
  views: number,
  averagerating: number,
  ingredients: EmbeddedIngredients[]
  owner: UserState ,
}

export type RecipeDetails = {
  _id?: ObjectId,
  owner: UserState,
  recipe: string,
  cuisine: string,
  description?: string,
  ingredients: EmbeddedIngredients[],
  instructions: string[],
  rating?: EmbeddedRating[],
  averagerating?: string,
  views?: number,
  comments?: EmbeddedComment[],
  imageurl?: string[],
  imagefile?: string
}

type EmbeddedComment = {
  commenter?: ObjectId,
  name?: string,
  content?: string,
  createdAt?: Date 
}

type EmbeddedRating = {
  commenter?: ObjectId,
  content?: number
}

type EmbeddedIngredients = {
  name: string,
  quantity: string,
  measurement?: string
}
