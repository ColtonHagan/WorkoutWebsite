import './index.scss';
import { React, useState } from 'react';
import usersAPI from '../../APIs/users';

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await usersAPI.loginUser({ email, password });
            console.log(response);
        } catch (error) {
            console.error("Login error:", error);
        }
    }
    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label>Username</label>
                <input type='text' onChange={(e) => setUsername(e.target.value)} value={username} />

                <label>Email</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />

                <label>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

                <button> Login </button>
            </form>
        </div>
    );
}

export default Login