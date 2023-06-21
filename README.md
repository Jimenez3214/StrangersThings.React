# strangersThings

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

# PROJECT GOALS BASED ON DATE:

MONDAY 6 - 5 - 2023
    Project was started.
    Basic outline and project goals

TUESDAY 6 - 6 - 2023
    Started pseudoCoding
    Research for project
    I also went fishing, but that's probably not relevant...

WEDNESDAY 6 - 7 - 2023
    Continuing pseudoCoding before class
    Skeleton code in readMe is finished
    Will run NPM Install and implement skeleton frame today in class
    Will try to have PseudoCode done

Thursday 6 - 8 - 2023
    Goal is to have a working and running skeleton framework
    With pseudocoding done, implementation should become reletively easy
    I have work this day, and till Monday, so if these goals are met we'll both be ahead of the game to tweak any issues later on.

Friday 6 - 9 - 2023
    Finished login component. Added fetchData function in ./api/index.js api is working, login component returns reponse is false. Need to check API documentation. Finished Post.js just need to do the AUTH JSON token string.. 

Monday 6 - 12 - 2023
    GOAL: is to have post, search, login component finished and functional. API returns post detail etc.

TUESDAY 6 - 13 - 2023
    GOAL: is to finish remaining components then begin testing and working out issues. Add a simple CSS styling.

    REALITY: Search is working. Finished CreateListing and AuthContext. Both are functional. Profile, view, and message still need to be finished. There is two registeration functions. One is tied to the login component. I can not get it to work for the life of me. Edd, if you're reading this, fixing that would be awesome! 

    I'll either have Profile, View, and Message done today or tomorrow before class. Work a full on Thursday, but I have Friday to to finish the project.

    LET'S GOOOOOOO!

    Created a MyListing component and deleted view component. Still have an issue with the token I need to fix.

    Almost there, just keep smiling.

WEDNESDAY 6 - 14 - 2023
    GOAL: fix any issues and make it look pretty and work on any extra credit/make sure we're good for the grading rubric. 

THURSDAY 6 - 15 - 2023
    GOAL make any last minute changes, push it, and deploy it to netlify!

# PROJECT GUIDE

1. Post View, Unaunthenticated
    - Fetch and Display Posts on the homepage
    - Make a GET request to `/api/posts` to fetch initial posts.
    - Populate the posts into the JSX.

2. Register/Login/Logout
    - Create a registration form with username, password, and password confirmation fields.
    - Send a correct AJAX request to the backend for user registration(`POST/api/users/register`).
    - Handle the response and stor the token in state (and optinionally local storage).
    - Store the token on successful login.
    - Implement a logout function to clear the token from state (and localStorage).

3. Post Form
    - Create a form for users to make new listings
    - **The form should match the fields expected by the API**
    - Intercept the submit button to send the correct fetch request (`POST/api/posts`).
    - Update the interface upon successful submission by adding the new post to the state.

4. Post View, Upgrade with Authentication
    - Enhance the posts view to show additional functionality for authentication users.
    - When making a GET request tp `/api/posts`, include token in the headers top fetch the posts made by the active user along with their messages/
    - Utilize the `isAuthor` field provided by the API to show/hide certain functionality based on whether the user is the author.

5. Delete Button
    - Add a delete button to each post
    - Implement a click handler to send a delet request (`DELETE /api/posts/:postId`) for the corresponding post.
    - Remove the post from the page and update the state upon successful deletion.

6. Messages Form
    - Add a form to send a message to the post author.
    - Display the form only if a user is logged in and is not the author of the post.
    - Implement the submit handler to send a message (`POST /api/posts/:postId/messages`) for the corresponding post.

7. Loading the User Object on Page Load
    - On page load, if a user is logged in (token is available), make a GET request to '/api/users/me`/
    - Retrieve the user object containing their received messages and posts.
    - Incorporate this as part of the page boottrapping process

8. Search Form
    - Implement a search form to filter listings.
    - Listen to user input in the search field and update the searchTerm in the  state.
    - Filter the listings based on the searchTerm and display the filtered results.

    # PROJECT WRAP UP

WEDNESDAY 06-21-23
    Project is complete and meets all the necessary requirements. Somethings I'm working on last minute are UI, the ability to have the users recieved messages be catagorized under the item the message was sent to, and cleaning the code up a bit. There's always more you can do, to make it better. 

    testing fix