import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Customers } from '../components/Customers';
import { Login } from '../components/Login';
import { Movies } from '../features/movies/Movies';
import { NavBar } from '../components/commons/NavBar';
import { NotFound } from '../components/commons/NotFound';
import { Provider } from 'react-redux';
import { Register } from '../components/Register';
import { Rentals } from '../components/Rentals';
import store from './configureStore';
import { MoviesForm } from '../features/movies/MoviesForm';

export const VideoStore = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <div className='container'>
                    <Routes>
                        <Route path='/customers' element={<Customers />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/movies' element={<Movies />} />
                        <Route path='/movies/:id' element={<MoviesForm />} />
                        <Route path='/not-found' element={<NotFound />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/rentals' element={<Rentals />} />
                        <Route path='/' element={<Navigate to='/movies' replace />} />
                        <Route path='*' element={<Navigate to='/not-found' replace />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
};
