import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { auth } from './firebase';
import Home from './components/Home/Home';
import Error from './components/error/error';
import Signin from './components/signin/Signin'
import Signup from './components/signout/signup'
import Profile from '../src/components/profile/Profile'
import SuggestAll from './components/suggestAll/SuggestAll';
import Search from './components/search/Search'


function App() {
  const [isAuth, setisAuth] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route path='*' element={<Error />}/>
      <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Signin />} />
      <Route path='/:username' element={<Profile/>}></Route>
      <Route path="/signup" element={isAuth ? <Navigate to="/" /> : <Signup />} />
      <Route path='/explore/people' element={<SuggestAll/>} />
      <Route path='/search' element={<Search/>}/>
    </Routes>
  );
}

export default App;
