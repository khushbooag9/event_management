import React, { useEffect, useState } from 'react';
import './HomePage.css';
import axios from 'axios';
import SearchBar from './SearchBar';

export default function HomePage() {
    const [recentEvents, setRecentEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [noEventsMessage, setNoEventsMessage] = useState('');

    useEffect(() => {
        // Fetch recently added events
        axios.get('https://event-management-y1ne.onrender.com/events?sort=date_added&limit=10').then(response => {
            setRecentEvents(response.data);
            setFilteredEvents(response.data);
        });
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = recentEvents.filter(event => 
            event.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(filtered);
        if (filtered.length === 0) {
            setNoEventsMessage("Sorry, there are no recent event in your selected location at the moment. Please try searching in a different area.");
        } else {
            setNoEventsMessage('');
        }
    };

    const handleCardClick = () => {
        alert('Please Login to book the event and for better experience :)');
    };

    return (
    <div>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {filteredEvents.length > 0 && filteredEvents.map(event => (
                <div
                    key={event._id}
                    className="h-96 w-80 bg-white rounded-md mt-14"
                    onClick={() => handleCardClick(event._id) }
                >
                    <div className="p-1 w-full">
                        {event.image && (
                            <img src={event.image} alt="Event" className="h-72 w-full object-cover" />
                        )}
                    </div>
                    <div className="p-1 ml-1 mt-0 font-semibold">
                        {event.name}<br />
                        {event.address}<br />
                        ₹{event.price}/-
                    </div>
                </div>
            ))}
        </div>
        {noEventsMessage && (
            <div className="w-full text-center text-red-500 text-lg font-semibold">
                {noEventsMessage}
            </div>
        )}
    </div>
);
}