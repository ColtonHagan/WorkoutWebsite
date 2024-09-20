import './index.scss';
import { useState } from 'react';
import usersAPI from '../../APIs/users'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await usersAPI.register({ email, password });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label>Email</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />

        <label>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} />

        <button> Sign Up </button>

        <p className='loginInfo'>
           Already have a Account? <br />
          <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
