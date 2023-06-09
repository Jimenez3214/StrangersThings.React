import React, { useState } from "react";
import ReactDOM from 'react-dom';

import Post from "./components/Post";
// import Search from "./components/Search";
// import Profile from "./components/Profile";
// import View from "./components/View";
import Login from "./components/login";
// import Message from "./components/Message";
 
const App = () => {
  return (
    <div className="app">
      <Post />
       {/* <Search />
      <Profile />
      <View /> */}
      <Login />
      {/* <Message />  */}
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

export default App;
