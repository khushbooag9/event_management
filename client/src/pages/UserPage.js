import Footer from '../Footer';
import React from 'react';
import './UserPage.css';
import SearchBar from './SearchBar';
import logo from './Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTenant } from '../tenantContext';

export default function UserPage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [noEventsMessage, setNoEventsMessage] = useState('');
    const [bookedEventIds, setBookedEventIds] = useState([]);
    const { tenant } = useTenant();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/events').then(response => {
            setEvents(response.data);
            setFilteredEvents(response.data);
        });
        // Fetch bookings for this user
        if (tenant?._id) {
            axios.get(`/bookings/user/${tenant._id}`).then(res => {
                // res.data should be an array of bookings
                setBookedEventIds(res.data.map(booking => booking.event));
            });
        }
    }, []);

    const handleCardClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    const handleSearch = (searchTerm) => {
        const filtered = events.filter(event =>
            event.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(filtered);
        if (filtered.length === 0) {
            setNoEventsMessage("Sorry, there are no registered events in this area. Please try searching in a different area.");
        } else {
            setNoEventsMessage('');
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-800">
                <div className="logo">
                    <img src={logo} alt="logo" className="w-20 h-12" />
                </div>
                <div className="user_page_right">
                    <Link to={'/userPage'}>Home</Link>
                    <Link to={'/Feature'}>Features</Link>
                    <Link to={'/About'}>About</Link>
                    <Link to={'/Contact'}>Contact</Link>
                    <div
                        className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden mr-4 size-8 cursor-pointer"
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7.5 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {isProfileMenuOpen && <ProfileMenu />}
                </div>
            </header>

            <SearchBar onSearch={handleSearch} />

            <div className="flex flex-wrap gap-4 w-full p-4 cursor-pointer">
                {noEventsMessage && (
                    <div className="w-full text-center text-red-500 text-lg font-semibold">
                        {noEventsMessage}
                    </div>
                )}
                {filteredEvents.length > 0 && filteredEvents.map(event => {
                    const isBooked = bookedEventIds.includes(event._id);
                    return (
                        <div
                            key={event._id}
                            className={`h-96 w-80 rounded-md mt-14 ml-8 ${isBooked ? 'bg-green-500' : 'bg-white'}`}
                            onClick={() => handleCardClick(event._id)}
                        >
                            <div className="p-1 w-full">
                                {event.image && (
                                    <img src={`http://localhost:4000${event.image}`} alt="Property" className="h-72 w-full object-cover" />
                                )}
                            </div>
                            <div className="p-1 ml-1 mt-0 font-semibold">
                                {event.name}<br />
                                {event.address}<br />
                                ₹{event.price}/-
                            </div>
                        </div>
                    );
                })}
            </div>

            <Footer />
        </div>
    );
}
