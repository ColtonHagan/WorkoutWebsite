import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useUserService from '../../services/useUsersService';
import './index.scss';

/**
 * AuthForm component handles user authentication (login/signup).
 *
 * @param {boolean} isLoginMode - Determines if the form is in login mode.
 */
const AuthForm = ({ isLoginMode = true }) => {
    const { setAuth } = useAuth();
    const { login, register } = useUserService();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(isLoginMode);

    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Register
            !isLogin && await register(email, password);

            // Login
            const response = await login(email, password);
            const accessToken = response.accessToken;
            setAuth({ password, accessToken });

            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (err) {
            handleError(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleError = (err) => {
        console.log(err);
        if (!err?.status) {
            setErrMsg("Server is offline");
        } else if (err.status === 400) {
            setErrMsg("Password must be at least 6 characters long");
        } else if (err.status === 401) {
            setErrMsg("Incorrect Email or Password");
        } else if (err.status === 409) {
            setErrMsg("Email already in use");
        } else {
            setErrMsg(`Failed to ${isLogin ? "login" : "sign up"}`);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>

                <p className={errMsg ? "error" : "hidden"} aria-live='assertive'>{errMsg}</p>

                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button disabled={isLoading}>{isLoading ? "Loading..." : (isLogin ? "Login" : "Sign Up")}</button>

                <p className='toggleAuth'>
                    {isLogin ? "Need an Account?" : "Already have an Account?"} <br />
                    <span
                        className='toggleLink'
                        onClick={() => setIsLogin(prev => !prev)}
                    >
                        {isLogin ? "Sign Up" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    );
}

// Prop Types validation
AuthForm.propTypes = {
    isLoginMode: PropTypes.bool,
};

export default AuthForm;
