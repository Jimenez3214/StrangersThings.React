import React, { createContext, useState, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import Search from "./components/Search";
import Login from "./components/login";
import Message from "./components/Message";
import RegistrationPage from "./components/Register";
import CreateListing from "./components/CreateListing";
import MyListings from "./components/MyListings";
import UserProfile from "./components/Profile";

export const COHORT_NAME = '2303-ftb-et-web-pt';
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [postId, setPostId] = useState(null);
  const [username, setUsername] = useState("");
  const isLoggedIn = !!token; // Check if the token exists to determine the login status

  const login = (newToken, newUsername) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    setUsername(newUsername);
    setAuthPostId(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setPostId(null);
    setUsername("");
  };

  const setAuthPostId = (newPostId) => {
    setPostId(newPostId);
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, postId, setAuthPostId, username, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};


const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link className="navbar-brand" to="/">
        StrangersThings
      </Link>
      {token ? (
        <>
          <Link className='nav-link' to="/Posts">New Listings</Link>
          <Link className='nav-link' to="/mylistings">My Listings</Link>
          <Link className='nav-link' to="/create">Create Listing</Link>          
          <Link className='nav-link' to="/login">Logout</Link>          
          <Link className='nav-link' to="/search">Search</Link>  
          <Link className='nav-link' to="/Message">Message</Link>  
        </>
      ) : (
        <>
          <Link className="nav-link" to="/Posts">
            New Listings
          </Link>
          <Link className="nav-link" to="/register">
            Register
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

const App = () => {
  const [username, setUsername] = useState("");

  const handleLogin = (username) => {
    setUsername(username);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Posts" element={<Post />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Profile" element={<UserProfile />} />
          <Route path="/Message" element={<Message />} />
        </Routes>

        <div className="app"></div>
      </BrowserRouter>
    </AuthProvider>
  );
};

const Home = () => {
  const divStyle = {
    backgroundColor: "black",
    minHeight: "100vh",
  };

  const textStyle = {
    backgroundColor: "black",
  };

  return (
    
    <div style={divStyle}>
      <div className="st">
        <div className="st-top">
          <div className="st-bound st-bound-full"></div>
          <p>
            <span className="st-drop st-stranger-s">S</span>
            <span className="st-stranger-t">t</span>
            <span className="st-stranger-r">r</span>
            <span className="st-stranger-a">a</span>
            <span className="st-stranger-n">n</span>
            <span className="st-stranger-g">g</span>
            <span className="st-stranger-e">e</span>
            <span className="st-stranger-r">r</span>
            <span className="st-drop st-stranger-s-2">S</span>
          </p>
          <div className="st-bound st-bound-mini st-bound-left"></div>
          <div className="st-bound st-bound-mini st-bound-right"></div>
        </div>
        <div className="st-bottom">
          <p>
            <span className="st-things-t">T</span>
            <span className="st-things-h">h</span>
            <span className="st-things-i">i</span>
            <span className="st-things-n">n</span>
            <span className="st-things-g">g</span>
            <span className="st-things-s">s</span>
          </p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
