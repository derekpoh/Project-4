import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import HomePage from "../HomePage/HomePage"
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

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
      <NavBar />
      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='/users/login' element={<LoginPage setUser={setUser} />}></Route>
      <Route path='/users/register' element={<RegisterPage setUser={setUser} />}></Route>
      </Routes>
    </main>
  )
}

export default App
