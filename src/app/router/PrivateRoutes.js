import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to='/login' replace />;
};
