import {Link, useNavigate } from 'react-router-dom';
import logo from './Logo.png';
import './Header.css'

export default function Header() {

    const navigate = useNavigate();

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === "user") {
            navigate('/UserRegister');
        } else if (value === "admin") {
            navigate('/AdminRegister');
        }
    };
    return(
    <header>
        <div class="logo">
            <img src={logo} alt="logo" className='w-10 h-12' />
        </div>
        <div class='right'>
            <Link to={'/login'}>Login</Link>
            <span> | </span>
            <select defaultValue="" onChange={handleChange}>
                <option value="" disabled>Register</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </div>
    </header>
    );
}