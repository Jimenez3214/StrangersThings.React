import React, { useState } from 'react';
import { BASE_URL } from '../api';
/* 
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       

        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    username: username,
                    password: password, 
                }),
            });
            const data = await response.json();
            console.log('Response:', data);
        
            if (response.ok) {
                // Perform the login
                // Redirect to history.push('/homepage');
            } else {
                // handle login failure
                console.log('Login failed');
            }
        } catch (error) {
            console.log('Something went wrong:', error);
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
                    <label>Username:</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <button type='submit'>Login</button>
                )}
            </form>
        </div>
    );
}; */

const Login = () => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const registerUser = async (username, password) => {
      try {
        const response = await fetch(`${BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username,
              password,
            },
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setToken(result.data.token);
        } else {
          setError(result.error.message);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred during registration. Please try again.");
      }
    };
    const loginUser = async (username, password) => {
      try {
        const response = await fetch(`${BASE_URL}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username,
              password,
            },
          }),
        });
        const result = await response.json();
        if (response.ok) {
          setToken(result.data.token);
        } else {
          setError(result.error.message);
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred during login. Please try again.");
      }
    };
    const logoutUser = () => {
      setToken(null);
      setError(null);
    };
    const makeHeaders = () => {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      return headers;
    };
    
    const isLoggedIn = () => {
      return !!token;
    };
    console.log(!!token);
    return (
      <div>
        <h1>Registration</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { username, password } = e.target.elements;
            registerUser(username.value, password.value);
          }}
        >
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <br />
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" required />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
        <h1>Login</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { username, password } = e.target.elements;
            loginUser(username.value, password.value);
          }}
        >
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={logoutUser}>Logout</button>
        {error && <p>{error}</p>}
        <p>{isLoggedIn() ? "User is logged in" : "User is logged out"}</p>
      </div>
    );
  };

export default Login;
