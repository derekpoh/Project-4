import { ObjectId } from 'mongodb';

export type UserState = {
    username: string;
    email: string;
    password: string;
    bookmarks?: object[]; 
  };

export type SetUserType = (user: UserState) => void

export type RecipeDetails = {
  owner: ObjectId | string,
  recipe: string,
  cuisine: string,
  description?: string,
  ingredients: EmbeddedIngredients[],
  instructions: string[],
  rating?: EmbeddedRating[],
  views: number,
  comments?: EmbeddedComment[],
}

type EmbeddedComment = {
  commenter?: ObjectId,
  content?: string
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