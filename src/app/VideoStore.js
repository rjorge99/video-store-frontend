import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoutes } from './router/PrivateRoutes';
import { PublicRoutes } from './router/PublicRoutes';
import { ToastContainer } from 'react-toastify';
import { loginWithJWT } from './storeSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Movies } from '../components/Movies';
import { MoviesForm } from '../components/MoviesForm';
import { NotFound } from '../components/commons/NotFound';
import { Rentals } from '../components/Rentals';
import { NavBar } from '../components/commons/NavBar';
import { Customers } from '../components/Customers';

export const VideoStore = () => {
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
                                <PublicRoutes>
                                    <Routes>
                                        <Route path='/login' element={<Login />} />
                                        <Route path='/register' element={<Register />} />
                                    </Routes>
                                </PublicRoutes>
                            }
                        />
                        <Route
                            path='/*'
                            element={
                                <PrivateRoutes>
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
