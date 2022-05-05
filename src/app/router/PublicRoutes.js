import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ isLoggedIn, children }) => {
    return isLoggedIn ? <Navigate to='/videos' replace /> : children;
};
