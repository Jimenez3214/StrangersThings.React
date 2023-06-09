import React from 'react';

const Login = () => {
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');
    const {isLoading, setIsLoading} = useState(false);

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
            <div>
            <label>Username:</label>
            <input
                type='text'
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                required
            />
            </div>
            <div>
                <label>Password:</label>
                <input
                type='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ): (
                <button type='submit'>Login</button>
            )}


            </form>

        </div>

        
    );
};

export default Login;