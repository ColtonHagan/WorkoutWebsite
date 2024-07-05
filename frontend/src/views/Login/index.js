import './index.scss';
import { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../APIs/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const emailRef = useRef();
    const errRef = useRef();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("users/login", {email, password}, { withCredentials: true });
            const accessToken = response?.data.accessToken;
            console.log(accessToken); //temp
            setAuth({username, password, accessToken});
            setEmail("");
            setUsername("");
            setPassword("");
            navigate(from, { replace : true});
        } catch (err) {
            if (!err?.response) {
                setErrMsg("Server is offline")
            } else if(err.response?.status === 400) {
                setErrMsg("Missing Username or Password")
            } else if(err.response?.status === 401) {
                setErrMsg("Incorrect Username or Password")
            } else {
                setErrMsg("Failed to login");
            }

            errRef.current.focus();
        }
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <p ref={errRef} className={errMsg ? "error" : "hidden"} aria-live='assertive'>{errMsg}</p>

                <label htmlFor='username'>Username</label>
                <input type='text' ref={userRef} onChange={(e) => setUsername(e.target.value)} value={username} required/>

                <label htmlFor='email'>Email</label>
                <input type='email' ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={email} required/>

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