import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
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

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="navbar-brand" to="/">Home</Link>
      {token ? (
        <>
          <Link className='nav-link' to="/Posts">New Listings</Link>
          <Link className='nav-link' to="/mylistings">My Listings</Link>
          <Link className='nav-link' to="/create">Create Listing</Link>          
          <Link className='nav-link' to="/login">Login</Link>
          <Link className='nav-link' to="/register">Register</Link>  
        </>
      ) : (
        <>
                  
          <Link className='nav-link' to="/login">Login</Link>
        </>
      )}
    </nav>
  );
};

const App = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          
        </Routes>

        <div className="app">
          <Search />
        </div>
   
      </BrowserRouter>
    </AuthProvider>
  );
};

const Home = () => {
  return <h1>Home</h1>;
};

const Logout = () => {
  return <h1>Logout</h1>;
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;