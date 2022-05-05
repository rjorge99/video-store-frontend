import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Customers } from '../components/Customers';
import { Login } from '../components/Login';
import { Movies } from '../features/movies/Movies';
import { NavBar } from '../components/commons/NavBar';
import { NotFound } from '../components/commons/NotFound';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../components/Register';
import { Rentals } from '../components/Rentals';
import { MoviesForm } from '../features/movies/MoviesForm';

import { loginWithJWT } from './storeSlice';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { PublicRoutes } from './router/PublicRoutes';
import { PrivateRoutes } from './router/PrivateRoutes';

export const VideoStore = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const jwt = localStorage.getItem('token');
        if (jwt) dispatch(loginWithJWT(jwt));
    }, [dispatch]);

    return (
        <>
            <ToastContainer />
            <BrowserRouter>
                <NavBar />
                <div className='container'>
                    <Routes>
                        <Route
                            path='/auth/*'
                            element={
                                <PublicRoutes isLoggedIn={isLoggedIn}>
                                    <Routes>
                                        <Route path='/auth/login' element={<Login />} />
                                        <Route path='/auth/register' element={<Register />} />
                                    </Routes>
                                </PublicRoutes>
                            }
                        />
                        <Route
                            path='/'
                            element={
                                <PrivateRoutes isLoggedIn={isLoggedIn}>
                                    <Routes>
                                        <Route path='/customers' element={<Customers />} />
                                        <Route path='/movies' element={<Movies />} />
                                        <Route path='/movies/:id' element={<MoviesForm />} />
                                        <Route path='/not-found' element={<NotFound />} />
                                        <Route path='/rentals' element={<Rentals />} />
                                        <Route
                                            path='/'
                                            element={<Navigate to='/movies' replace />}
                                        />
                                        <Route
                                            path='*'
                                            element={<Navigate to='/not-found' replace />}
                                        />
                                    </Routes>
                                </PrivateRoutes>
                            }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
};
