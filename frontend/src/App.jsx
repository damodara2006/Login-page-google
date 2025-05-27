import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Login"
import Home from "./Home"
import { GoogleOAuthProvider } from '@react-oauth/google';
import.meta.env

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_CLIENT_ID}>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Home/>} />

    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
