import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/**
 * A component that checks if the user is authenticated.
 * If authenticated, it renders the child routes; otherwise, it redirects to the login page.
 */
const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;