import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const { loggedIn } = useSelector((state) => state.auth);
    return loggedIn ? children : <Navigate to='/auth/login' replace />;
};
