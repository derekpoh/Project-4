import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage"
import NavBar from '../../components/NavBar/NavBar';


const App = () => {

  return (
    <main>
      <NavBar />
      <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      </Routes>
    </main>
  )
}

export default App
