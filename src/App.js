import React, { useContext } from 'react'

// import Pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import Home from './Pages/Home'

// import Router
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Context
import { AuthContext } from './Context/AuthContext';

// import Styles
import './Styles/style.scss'

const App = () => {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ childern }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return childern
  }

  console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App