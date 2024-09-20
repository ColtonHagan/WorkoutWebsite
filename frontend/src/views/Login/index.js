import './index.scss';
import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../APIs/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

//This can probably be made duel purpose with login

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setErrMsg("");
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("users/login", {email, password}, { withCredentials: true });
            const accessToken = response?.data.accessToken;
            console.log(accessToken); //temp
            setAuth({password, accessToken});
            setEmail("");
            setPassword("");
            navigate(from, { replace : true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Server is offline")
            } else if(err.response?.status === 400) {
                setErrMsg("Missing Email or Password")
            } else if(err.response?.status === 401) {
                setErrMsg("Incorrect Email or Password")
            } else {
                setErrMsg("Failed to login");
            }
        }
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h2> Login </h2>

                <p className={errMsg ? "error" : "hidden"} aria-live='assertive'>{errMsg}</p>

                <label htmlFor='email'>Email</label>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required/>

                <label htmlFor='password'>Password</label>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required/>

                <button> Login </button>

                <p className='signUpInfo'>
                    Need an Account? <br/>
                    <Link to='/signup'>Sign Up</Link>
                </p>
            </form>
        </div>
    );
}

export default Login