import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import HomePage from "../HomePage/HomePage"
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserAccountPage from '../UserAccountPage/UserAccountPage';
import MyRecipesPage from '../MyRecipesPage/MyRecipesPage';
import CreateRecipePage from '../CreateRecipePage/CreateRecipePage';
import BookmarksPage from '../BookmarksPage/BookmarksPage';

type UserState = {
  username: string;
  email: string;
  password: string;
  bookmarks?: object[]; 
};

const App = () => {

const [user, setUser] = useState<UserState>(getUser())

  return (
    <main>
      <NavBar user={user} setUser={setUser} />
      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/users/login" element={<LoginPage setUser={setUser} />}></Route>
      <Route path="/users/register" element={<RegisterPage setUser={setUser} />}></Route>
      <Route path="/users/account" element={<UserAccountPage />}></Route>
      <Route path="/users/account/myrecipes" element={<MyRecipesPage />}></Route>
      <Route path="/users/account/createrecipe" element={<CreateRecipePage />}></Route>
      <Route path="/users/account/bookmarks" element={<BookmarksPage />}></Route>
      </Routes>
    </main>
  )
}

export default App
