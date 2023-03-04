import React from 'react'

// import Pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import Styles
import './Styles/style.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App