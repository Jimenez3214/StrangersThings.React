import ReactDOM from 'react-dom';
import React, { createContext, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Post from "./components/Post";
import Search from "./components/Search";
import Login from "./components/login";
import Message from "./components/Message";
import RegistrationPage from "./components/Register";
import CreateListing from "./components/CreateListing";
import MyListings from "./components/MyListings";




export const COHORT_NAME = '2303-ftb-et-web-pt';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [postId, setPostId] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setAuthPostId(newToken); // Set the postId as the same value as the newToken
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setPostId(null); // Clear the postId when logging out
  };

  const setAuthPostId = (newPostId) => {
    setPostId(newPostId);
  };

  console.log('AuthToken:', token);

  return (
    <AuthContext.Provider value={{ token, login, logout, postId, setAuthPostId }}>
      {children}
    </AuthContext.Provider>
  );
};


const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
    <nav>
      
    </nav>
    </BrowserRouter>

      <div className="app">
        <Search />
        <Post />
        <RegistrationPage />
        <CreateListing />
        <MyListings />
        <Login />
        <Message />
        
      </div>
    </AuthProvider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
