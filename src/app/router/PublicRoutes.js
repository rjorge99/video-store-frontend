import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children }) => {
    const { loggedIn } = useSelector((state) => state.auth);
    return loggedIn ? <Navigate to='/movies' replace /> : children;
};
