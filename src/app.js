import React from "react";
import ReactDOM from 'react-dom';
import { AuthProvider } from './AuthContext';

import Post from "./components/Post";
import Search from "./components/Search";
// import Profile from "./components/Profile";
// import View from "./components/View";
import Login from "./components/login";
// import Message from "./components/Message";
import RegistrationPage from "./components/Register";
import CreateListing from "./components/CreateListing";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Post />
        <Search />
        <RegistrationPage />
        <CreateListing />
        {/* 
        <Profile />
        <View /> */}
        <Login />
        {/* <Message />  */}
      </div>
    </AuthProvider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
