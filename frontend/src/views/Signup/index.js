import './index.scss';
import { React, useState } from 'react';
import usersAPI from '../../APIs/users'

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usersAPI.registerUser({username, email, password});
      setUsername("");
      setEmail("");
      setPassword("");
      console.log("User signed up successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label>Username</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} value={username} />

        <label>Email</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />

        <label>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

        <button> Sign Up </button>
      </form>
    </div>
  );
}

export default Signup;
