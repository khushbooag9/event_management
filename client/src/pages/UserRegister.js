import { useState } from 'react';
import './Register.css'
import { Link, Navigate} from "react-router-dom";
import axios from 'axios';
export default function UserRegister(){
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [confirm_pswd,setConfirmPswd]= useState('');
    const [address,setAddress]= useState('');
    const [phone_no,setPhoneNo]= useState('');
    const[redirect, setRedirect]= useState(false);

    async function registerUser(ev){
        ev.preventDefault();
        if (password !== confirm_pswd) {
            alert('Passwords do not match!');
            return;
        }
        try{
            await axios.post('https://event-management-y1ne.onrender.com/UserRegister',{
                name, email, password, address, phone_no,
            });
            alert('Registration successful. Now you can login.');
            setRedirect(true);
        }catch(e){
            alert('Registration failed. Please try again later');
        }
        
    }

    if(redirect){
        return <Navigate to={'/Login'}/>
    }
    return(
        <div class="container">
        <div class="apply_box">
            <span class="heading">Register</span>
            <section class="heading_section"></section>

            <form onSubmit={registerUser}>
                <div class="form_container">
                    <div class="form_control">
                        <label for="User_name">Name</label>
                        <input id="User_name" name="User_name" placeholder="Your Name" value={name} onChange={ev=> setName(ev.target.value)} required/>

                    </div>
                    <div class="form_control">
                        <label for="Email">Email</label>
                        <input type="Email" name="Email" placeholder="Email" value={email} onChange={ev=> setEmail(ev.target.value)} required/>

                    </div>
                    <div class="form_control">
                        <label for="Password">Password</label>
                        <input type="Text" id="Password" name="Password" placeholder="Password" value={password} onChange={ev=> setPassword(ev.target.value)} required/>

                    </div>
                    <div class="form_control">
                        <label for="ConfirmPassword">Confirm Password</label>
                        <input type="Text" id="Password" name="ConfirmPassword" placeholder="Re-enter your Password" value={confirm_pswd} onChange={ev=> setConfirmPswd(ev.target.value)} required/>

                    </div>

                    <div class="form_control">
                        <label for="City">Address</label>
                        <input id="City" name="City" placeholder="Address" value={address} onChange={ev=> setAddress(ev.target.value)} required/>

                    </div>
                    <div class="form_control">
                        <label for="Phone no.">Phone no.</label>
                        <input type="text" maxlength="10" pattern="\d{10}" id="Phone no" name="Phone no"
                            placeholder="Phone no." value={phone_no} onChange={ev=> setPhoneNo(ev.target.value)} required/>

                    </div>

                </div>
                <div class="button_section">
                    <button type="submit" className='login_btn'>Register</button>
                </div>
                <div class="login_page">
                    <div class='span'>Already have an account?</div>
                    <Link to={'/Login'}>Login</Link>
                </div>
            </form>
        </div>
    </div>
    );
}