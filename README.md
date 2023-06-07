# strangersThings

yooooooooooooooooooooooooooo
//test

1. Create each component
    
    home page
    post (edit and delete in his posts. Need a search function. Can only send messages to strangers/ View and edit items)
    search (filter on all text)
    /profile
    View   
    login
    logout
    message users



2. PAGES 
    LOGIN/CRREATE ACCOUNT
    HOME
    POSTS (Title, Description, Price, Location / all text entry. Willing to deliver checkbox. Then create. Add alert message succesfully created/ send message)
    PROFILE (Display messages, *Message Again loads a new page with the post)

    LOGOUT

One main page - 

Right search/create posts/edit/delete
Center will display posts
Left side will be profile/messages/create messages

final change

****************************************************************
            COMPONENT PAGES AND FUNCTIONS FOR OUTLINE and Skeleton/PseudoCode
****************************************************************

1. HOME PAGE
    Component represents the langing page for application
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

```


2. POST
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

```


3. Search
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

```

4. Profile
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

```

5. View
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

```

6. Login
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
            const response = await fetch ('apiEndpoint', {
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

7. Logout
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

8. Message Users
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
