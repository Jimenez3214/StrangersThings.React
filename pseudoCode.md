***************************************************************
COMPONENT PAGES AND FUNCTIONS FOR OUTLINE and Skeleton/PseudoCode
***************************************************************

# 1. HOME PAGE
    Component represents the landing page for application
    It can display featured listings, categories, or any other info
    You can include a search bar or a link for searching

SKELETON FRAME

```JavaScript

import React from 'react';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to StrangersThings!</h1>
            {/* Our code goes here! */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import Post from "./components/Post";
import Search from "./components/Search";
import Login from "./components/Login";
import RegistrationPage from "./components/Register";
import CreateListing from "./components/CreateListing";
import MyListings from "./components/MyListings";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Search</Link>
              </li>
              <li>
                <Link to="/post">Post</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/create">Create Listing</Link>
              </li>
              <li>
                <Link to="/listings">My Listings</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/" component={Search} />
            <Route path="/post" component={Post} />
            <Route path="/register" component={RegistrationPage} />
            <Route path="/create" component={CreateListing} />
            <Route path="/listings" component={MyListings} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;


```


# 2. POST
    Component represents an individual listing
    Displays the details of specific post, title, descrpition, price, and contact info
    Includes functionality to edit and delete post if the user is the owner
    Allows users to send messages to the poster

SKELETON FRAME

```JavaScript

import React from 'react';

const Post = () => {
    return (
        <div>Post Detail</div>
        {/* Our code goes here! */}
    );
}:

```
psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript

import React, { useState, useEffect } from 'react';

const Post = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // sim data fetch API
        const fetchPost = async () => {
            try {
                // API Call
                // Replace 'apiEndpoint' with out API
                const response = await fetch('apiEndpoint/posts/${postId}');
                const data = await response.json();

                setPost(data);
                setIsLoading(false);
            } catach (error) {
                console.log('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);
    
    const handleEditPost = () => {
        console.log('Editing post:', post);
        //add code for editing post
    };

    const handleDeletePost = () => {
        console.log('Deleting post:', post);
        //add code for deleting
    };

    return (
        <div>
            <h1>Post Detail</h1>
            {isLoading ? (
                <p>Loading post...</p>
            ) : post ? (
                <div>
                    <p>Title: {post.title}</p>
                    <p>Description: {post.description}</p>
                    {/* Render other details you know the drill */}
                    <button onClick={handleEditPost}>Edit Post</button>
                    <button onClick={handleDeletePost}>Delete Post</button>
                </div>
            ) : (
                <p>Post not found</p>
            )}
        </div>
    );
};

export default Post;

```


# 3. Search
    Component handles the search functionality
    displas the search results based on the users input or selected filters
    includes a search bar and filter options for refining the seach results

SKELETON FRAME

```JavaScript

import React from 'react';

const Search = () => {
    return (
        <div>
            <h1>Search Listings</h1>
            {/* Our code goes here! */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript

import React, { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = userState('');
    const [searchResults, setSearchResults] = userState([]);
    const [isLoading, setIsLoading] = userState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        // Set the isLoading state to true... derp
        setIsLoading(true);

        try {
            // Simulate an API call
            // Replace 'apiEndpoint' with out actual URL
            const response = await fetch('apiEndpoint/search?q=${searchQueary}')
            const data = await response.json();

            setSearchResults(data);
        } catch (error) {
            console.log('Error during the search my dude :(', error);
        }

        setIsLoading(false);
    };

    return (
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search query"
                    required
                />
                <button type="submit">Search</button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
                ) : (
                    <div>
                        {searchResults.length > 0 ?(
                            <ul>
                                {searchResults.map((results) => (
                                    <li key={result.id}>{result.title}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No results found</p>
                        )}
                    </div>
                )}
        </div>
    );
};

export default Search;
```

# 4. Profile
    Component represents the user's profile page
    Displays info about the user, such as username, profile pic, and contact details
    it includes abiltiy to edit the user profile info
    lists users posted items and allows editing and deletion

SKELETON FRAME

```JavaScript

Import React from 'react';

const Profile = () => {
    return (
        <div>
            <h1>User Profile</h1>
            {/* Our code goes here */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript

import React, { useState, useEffect } from 'react';

const Profile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // API call to fetch user details
                // Replace 'apiEndpoint' with our URL
                const response = await fetch('apiEndpoint/users/${userId}');
                const data = await response.json();

                setUser(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    const handleEditProfile = () => {
        console.log('Editing profile:', user);
        // Add code for editing profile
    };

    return (
        <div>
            <h1>User Profile</h1>
            {isLoading ? (
                <p>Loading user profile...</p>
            ): user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Render Details */}
                    <button onClick={handleEditProfile}>Edit Profile</button>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
};

export default Profile;
```

# 5. View
    Component represents deailed view of user's item or listings
    Displays complete info about particular item, images, description, price, contact info.
    Includes a button to send messages to the poster

SKELETON FRAME

```JavaScript

import React from 'react';

const View = () => {
    return (
        <div>
            <h1>Item Detail View</h1>
            {/* Our code... You know what, this is getting redundent... */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript
import React, { useState, useEffect } from 'react';

const View = ({ itemId }) => {
    const [item, setItem] = useState(null);
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulating fetch from API
        const fetchItem = async () => {
            try {
                // API call to fetch ID
                // Replace the 'apiEndPoint' with our actual API url
                const response = await fetch('apiEndpoint/items/${itemID}');
                const data = await response.json();

                setItem(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [itemId]);

    const handleEditItem = () => {
        // Handle the edit item func
        console.log('Editing Item:', item);
        // ADD code to naviate to edit item page or perform edit
    };

    return (
        <div>
            <h1>Item Detail View</h1>
            {isLoading ? (
                <p>Loading Item...</p>
            ) : (
                <div>
                    <p>Title: {item.title}</p>
                    <p>Descriptiion: {item.description}</p>
                    {/* Render other details of the item */}
                    <button onClick={handleEditItem}>Edit Item</button>
                </div>
            ) :(
                <p>Item not found</p>
            )}
        </div>
    );
};

export default View;
```

# 6. Login
    Component handles the login functionality
    Includes input fields for username/email and password
    Allows users to authenticate and login to their accounts

SKELETON FRAME

```JavaScript

import React from 'react';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            {/* do your thing here... I think I'm going to do movie quotes next */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript
import React, { useState } from 'react';

const Login = () => {
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');
    const {isLoading, setIsLoading} = useState(false);

    const handleLogin = async (e) => {
        e.prevetDefault();

        // Set the isLoading state to true to show a loading indicator
        setIsLoading(true);

        try {
            // sim API call for user auth
            // Replace 'apiEndpoint' with actual endpoint URL
            const response = await fetch (`${BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
         if (response.ok) {
            // Perfrm login logic here
            // after login redirect user to history.push('/homePage')
         } else {
            //handle login failure
            console.log('Dang, try again');
         } catch (error) {
            console.log('Something went wrong dude:', error);
         }

         setUsername('');
         setPassword('');
         setIsLoading(false);
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <lable>Username:</lable>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <lable>Password:</lable>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button type ="submit">Login</button>
                )}
            </form>
        </div>
    );
};

export default Login;
```

# 7. Logout
    Component handles the logout functionality
    it logs out the currently authenticated user and redirects to the home page

SKELETON FRAME

```JavaScript

import React from 'react';

const Logout = () => {
    return (
        <div>
            <h1>Logout</h1>
            {/* I am Jack's complete lack of surprise */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript
import React, { useState } from 'react';

const Logout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = () => {
        // Set state to true to show loading indicator
        setIsLoggingOut(true);

        // sim logout process
        setTimeout(() => {
            //logout logic here, clearing user sess
            //logout logic is completed
            setIsLoggingOut(false);
        }, 2000);
        //Redirect user to the login page here
        // use router library history.push('/login')

    };

};

return (
    <div>
        <h1>Logout</h1>
        {isLoggingOut ? (
            <p>Logging Out...</p>
            ) : (
              <button onClick={handleLogout}>Logout</button>)}
    </div>
);
};

export default Logout;
```

# 8. Message Users
    This component provides a user interface for sending and receiving messages
    It displays a list of conversations and allows users to click on a concversation to view and reply to messages

SKELETON FRAME

```JavaScript

import React from 'react';

const MessageUsers = () => {
    return (
        <div>
            <h1>Messages</h1>
            {/* Really? really? This is the last one? But I have so many movie quotes! */}
        </div>
    );
};

```

psuedoCode (WARNING: THIS PROBABLY NEEDS TO BE EDITED AND WORKED ON FURTHER)

```JavaScript

import React, { useState, useEffect } from 'react';

const MessageUsers = () => {
    const [message, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // fetching data from API
        const fetchMessages = async () => {
            try {
                //Make API call
                //Replace apiEndpoint with the real endpoint url
                const response = await fetch('apiEndpoint');
                const data = await response.json();

                setMessages(data);
                setIsLoading(false);
            } catch (error) {
                console.log('Error is a fetching!', error);
            }
        };
        fetchMessages();
    } )
};

const handleSendMessage = (useId, message) => {
    console.log('Sending message to user ${userID}: ${message}')
};

return (
    <div>
        <h1>Messages</h1>
        {isLoading ?(
            <p>Loading messages...</p>
        ) : (
            <div>
            {message.length === 0 ? (
                <p>No messages available</p>
            ) : (
                <ul>
                    {message.map((message) => (
                        <li key={message.id}>
                            <p>From: {message.sender} </p>
                            <p>To: {message.recipient}</p>
                            <p>{message.content}</p>
                        </li>
                    ))}
                </ul>
            )}
            </div>
        )}
    </div>
    {/* form for sending message */}
    <form
        onSubmit={(e) => {
            e.preventDefult();
            const userId = ''; // Provide userid
            const message = ''; // Get message
            handleSendMessage(userId, message);
        }}
    >
        <input type="text" placeholder="Recipient ID" />
        <input type="text" placeholder="Message" />
        <button type="submit">Send Message</button>
    </form>
</div>

);
};

export default MessageUsers;

```

react
reactdom
reactscripts
