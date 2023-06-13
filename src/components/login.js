import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api';
import { AuthContext } from '../AuthContext';



const Login = ({ token }) => {
  const [localToken, setLocalToken] = useState(null);
  const [error, setError] = useState(null);

  const setToken = (newToken) => {
    setLocalToken(newToken);
    localStorage.setItem('token', newToken);
  };

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
            password
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
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
      return !!localToken;
    };
    console.log(!!localToken);
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



  



