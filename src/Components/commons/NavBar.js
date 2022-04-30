import { NavLink } from 'react-router-dom';
import authService from '../../services/authService';

export const NavBar = () => {
    const handleLogout = () => {
        authService.logout();
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <NavLink className='navbar-brand' to='/'>
                    Store
                </NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNavAltMarkup'
                    aria-controls='navbarNavAltMarkup'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav'>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/movies'>
                            Movies
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/customers'>
                            Customers
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/rentals'>
                            Rentals
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/login'>
                            Login
                        </NavLink>
                        <NavLink
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/register'>
                            Register
                        </NavLink>
                        <NavLink
                            onClick={handleLogout}
                            className={({ isActive }) => `nav-link ${isActive && 'active'}`}
                            to='/login'>
                            Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};
