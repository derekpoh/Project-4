import { ObjectId } from 'mongodb';

export type UserState = {
    _id: ObjectId,
    username: string;
    email: string;
    password: string;
    bookmarks?: object[]; 
  };

export type SetUserType = (user: UserState) => void

export type RecipeDetails = {
  _id: ObjectId,
  owner: ObjectId | string,
  recipe: string,
  cuisine: string,
  description?: string,
  ingredients: EmbeddedIngredients[],
  instructions: string[],
  rating?: EmbeddedRating[],
  averagerating?: string,
  views: number,
  comments?: EmbeddedComment[],
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