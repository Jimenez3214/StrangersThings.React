import React, { useState } from 'react';
import { BASE_URL } from '../api';

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
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
};

export default Login;
