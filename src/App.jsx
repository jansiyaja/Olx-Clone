import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './Context/AuthContext';
import { Post } from './Context/PostContext'; 
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import LoginPage from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Post> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/create' element={<Create/>}/>
            <Route path='/view' element={<View/>}/>
          </Routes>
        </Post>
      </AuthContextProvider>
    </div>
  );
}

export default App;
