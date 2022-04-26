import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Customers } from './Components/Customers';
import { Login } from './Components/Login';
import { Movies } from './Components/Movies';
import { NavBar } from './Components/commons/NavBar';
import { Register } from './Components/Register';
import { Rentals } from './Components/Rentals';

export const VideoStore = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className='container'>
                <Routes>
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/movies' element={<Movies />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/rentals' element={<Rentals />} />
                    <Route path='/' element={<Navigate to='/movies' replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
