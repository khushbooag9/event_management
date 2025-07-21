import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTenant } from '../tenantContext';
import { useLandlord } from '../landlordContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('User'); // Default to User
    const { setTenant } = useTenant('');
    const { setLandlord } = useLandlord('');
    const navigate = useNavigate();

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('https://event-management-y1ne.onrender.com/login', { email, password, userType });
            if (response.status === 200) {
                alert("Login successful");
                if (userType === 'User') {
                    setTenant(response.data);
                    navigate('/UserPage'); 
                } else {
                    setLandlord(response.data);
                    localStorage.setItem('adminId', response.data._id); 
                    navigate('/AdminPage'); 
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Incorrect password');
            } else if (error.response && error.response.status === 404) {
                alert('User not found');
            } else {
                alert('Login failed. Please try again later.');
            }
        }
    }

    return (
        <div className="container">
            <div className="login_apply_box">
                <span>Login</span>
                <section className="heading_section"></section><br />
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <div className="form_control">
                            <label>You are:</label>
                            <div className="radioBox">
                                <input 
                                    type="radio" 
                                    id="user" 
                                    name="type" 
                                    value="User" 
                                    checked={userType === 'User'} 
                                    onChange={() => setUserType('User')} 
                                />
                                <label htmlFor="user">User &nbsp; &nbsp;</label>
                                <input 
                                    type="radio" 
                                    id="admin" 
                                    name="type" 
                                    value="Admin" 
                                    checked={userType === 'Admin'} 
                                    onChange={() => setUserType('Admin')} 
                                />
                                <label htmlFor="admin">Admin</label>
                            </div>
                        </div>
                        <div>
                            <div className="form_control">
                                <label htmlFor="Email">Email</label>
                                <input 
                                    type="email" 
                                    name="Email" 
                                    placeholder="Email" 
                                    value={email} 
                                    onChange={ev => setEmail(ev.target.value)} 
                                    required 
                                />
                            </div>
                            <div className="form_control">
                                <label htmlFor="Password">Password</label>
                                <input 
                                    type="password" 
                                    id="Password" 
                                    name="Password" 
                                    placeholder="Password" 
                                    value={password} 
                                    onChange={ev => setPassword(ev.target.value)} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="button_section">
                            <button type="submit" className='login_btn'>Login</button>
                        </div>
                        <div className="forgot_pswd">
                            <Link to={'/forgotpswd'}>Forgot password?</Link>
                        </div>
                        <div className="reg_page">
                            <span>New to Eventz?</span>
                            <span className="register">
                                <Link to={userType === 'User' ? '/UserRegister' : '/AdminRegister'}>
                                    Register
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}