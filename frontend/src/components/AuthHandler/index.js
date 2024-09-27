import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";
import './index.scss';

/**
 * AuthHandler component that manages authentication state.
 *
 * This component verifies the user's authentication status 
 * and redirects to the login page if the user is not authenticated.
 *
 * @returns {JSX.Element} Outlet / Loading component
 */
const AuthHandler = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error("Error getting refresh token", err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => { isMounted = false; };
    }, []);

    if (isLoading) {
        return <div className="loading"><Loading/></div>
    }

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AuthHandler;
