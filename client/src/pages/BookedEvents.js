import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserPage.css'; // Reuse styling
import Footer from '../Footer';
import { useTenant } from '../tenantContext';
import { useNavigate } from 'react-router-dom';

export default function BookedEvents() {
    const [bookedEvents, setBookedEvents] = useState([]);
    const { tenant } = useTenant();
    const navigate = useNavigate();

    useEffect(() => {
        if (tenant?._id) {
            axios.get(`/bookings/user/${tenant._id}`)
                .then(async res => {
                    const bookingEventIds = res.data.map(b => b.event);
                    const allEvents = await axios.get('/events');
                    const filtered = allEvents.data.filter(e => bookingEventIds.includes(e._id));
                    setBookedEvents(filtered);
                });
        }
    }, [tenant]);

    const handleCardClick = (eventId) => {
        navigate(`/events/${eventId}`);
    };

    return (
        <div>
            <h1 className="text-center font-bold text-2xl mt-6">Booked Events</h1>

            <div className="flex flex-wrap gap-4 w-full p-4 cursor-pointer">
                {bookedEvents.length === 0 && (
                    <div className="w-full text-center text-gray-500 text-lg font-semibold mt-10">
                        No events booked yet.
                    </div>
                )}
                {bookedEvents.map(event => (
                    <div
                        key={event._id}
                        className="h-96 w-80 rounded-md mt-14 ml-8 bg-green-500 border border-green-500 shadow-md"
                        onClick={() => handleCardClick(event._id)}
                    >
                        <div className="p-1 w-full">
                            {event.image && (
                                <img src={`http://localhost:4000${event.image}`} alt="Event" className="h-72 w-full object-cover" />
                            )}
                        </div>
                        <div className="p-1 ml-1 mt-0 font-semibold">
                            <div className="flex justify-between items-center">
                                <span>{event.name}</span>
                                <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded-md">Booked</span>
                            </div>
                            {event.address}<br />
                            ₹{event.price}/-
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}
