// page designated for navigation between different pages using react-router-dom

import react from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


// function to logout user 
function Logout() {
  localStorage.clear()  // when logging-out, clear local storage from access and refresh tokens
  return <Navigate to="/login" /> 
}

// function to register user and logout 
function RegisterAndLogout() {
  localStorage.clear()  // when registering, clear local storage first in order not to have any older access and refresh tokens in local storage 
  return <Register /> 
}

// main app
function App() {
  // set App components to navigate on different pages 
  return (
    <BrowserRouter>
      <Routes>

        <Route 
          path="/"
          element={
            // home page is for users having granted authentication (protected)
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />

        <Route 
          path="/login"
          element={
              // login page can be accessed freely (unprotected)
              <Login/>
          }
        />  

        <Route 
          path="/logout"
          element={
              // logout page can be accessed freely (unprotected)
              <Logout/>
          }
        />  

        <Route 
          path="/register" 
          element={
              // register page can be accessed freely (unprotected)
              <RegisterAndLogout/>
          }
        />  
        
        <Route 
          path="*"   // going to any other path expept registered ones will return NotFound
          element={
              // login can be accessed freely (unprotected)
              <NotFound/>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
