import {Link} from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import logo from './Logo.png';
export default function Footer() {
    return (
        <div className="page-container">
            <div className="content-wrap">
                {/* Main content goes here */}
            </div>
        <footer>
            <div class="row">
                <div class="column">
                    <div class="logo_title">
                        <img src={logo} class="footer_logo" alt="logo" />
                    </div>
                    <p>Eventz.com is India’s premier event booking and management platform where users 
                        can discover and book various events.
                        It helps event-goers find the most happening events and exclusive experiences while
                        also empowering organizers to seamlessly promote and manage their events.
                    </p>
                </div>
                <div class="column">
                    <h3>Office</h3>
                    <p>Mall Road</p>
                    <p>Whitehouse, Mathura</p>
                    <p>Uttar Pradesh, PIN 281003, India</p>
                    <p class="email-id">eventz@gmail.com</p>
                    <h4>+91 - 9747345759</h4>
                </div>
                <div class="column">
                    <ul>
                        <h3>Links</h3>
                        <li>Home</li>
                        <li>Services</li>
                        <li>About Us</li>
                        <li>Features</li>
                        <li>Contacts</li>
                    </ul>
                </div>
                <div class="column" id="social-icons">
                    <h3>Join us at:</h3>
                    <Link to={"https://facebook.com"}><FontAwesomeIcon icon={faFacebook} /></Link>
                    <Link to={"https://twitter.com"}><FontAwesomeIcon icon={faTwitter} /></Link>
                    <Link to={"https://linkedin.com"}><FontAwesomeIcon icon={faLinkedin} /></Link>
                    <Link to={"https://instagram.com"}><FontAwesomeIcon icon={faInstagram} /></Link>
                </div>
            </div>
            <div class="copyright">
                <h4>&copy; 2025-35 Eventz.com &nbsp;All rights are reserved.</h4>
            </div>
        </footer>
    </div>
    );
}