import React, { useState } from "react";
import { BASE_URL } from '../api';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegistration = async (e) => {
        e.preventDefault();
      
        setIsLoading(true);
        setError(null);
      
        try {
            const response = await fetch(`${BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                    username: username,
                    password: password,
                    },
                }),
            });
      
            if (response.ok) {
                console.log('Registration successful');
            } else {
                const data = await response.json();
                console.log(data);
                setError(data.error);
            }
        } catch (error) {
            console.log('Error during registration:', error);
            setError('An error occurred during registration. Please try again...');
        }
      
        setIsLoading(false);
    };
      

    return (
        <div>
            <h1>Registration</h1>
            <form onSubmit={handleRegistration}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Register'}
                </button>                
            </form>
            {error && <p>{String(error)}</p>}
        </div>
    );
};

export default RegistrationPage;
