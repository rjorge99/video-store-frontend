import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Customers } from './Components/Customers';
import { Login } from './Components/Login';
import { Movies } from './Components/Movies';
import { NavBar } from './Components/commons/NavBar';
import { Register } from './Components/Register';
import { Rentals } from './Components/Rentals';
import { NotFound } from './Components/commons/NotFound';
import store from './store/configureStore';
import { Provider } from 'react-redux';

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
