import React, { useState } from "react";
import ReactDOM from 'react-dom';

import Post from "./components/Post";
import Search from "./components/Search";

const App = () => {
  return (
    <div className="app">
      <Post />
      <Search />
      <h1>Profile</h1>
      <h1>View</h1>
      <h1>Login</h1>
      <h1>Logout</h1>
      <h1>Message</h1>
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
