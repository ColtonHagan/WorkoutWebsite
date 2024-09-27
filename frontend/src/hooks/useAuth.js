import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

/**
 * Custom hook for accessing the authentication context.
 * 
 * This hook provides access to the auth context.
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export default useAuth