import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';

export default function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        axios.get(`https://event-management-y1ne.onrender.com/events/${id}`).then(response => {
            setEvent(response.data);
            console.log(response.data);
        });
    }, [id]);

    if (!event) return <div>Loading...</div>;

    return (
        <div className="p-10 pt-4">
            <div className="bg-white rounded-md shadow-2xl p-4 pt-1 max-w-7xl ml-52 mr-52">
                <h1 className="text-5xl font-bold mt-2 ml-2">{event.name}</h1>
                <p className="text-sm text-gray-500 ml-2 mt-2">Added on: {new Date(event.date_added).toLocaleDateString()}</p>
                {event.image && (
                    <img src={`https://event-management-y1ne.onrender.com${event.image}`} alt="Event" className="prop_img object-cover rounded-md mt-4" />
                )}
                <p className="text-lg mt-2 font-semibold">Event Date: {event.rooms ? new Date(event.rooms).toLocaleDateString() : ''}</p>
                <p className="text-lg mt-2 font-semibold">Venue: {event.address}</p>
                <p className="text-lg font-semibold">Price: ₹{event.price}/-</p>

                <p className="mt-4 p-2 border-4 mr-60">{event.description}</p>

                <div className="mt-4 pt-3 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
                    {/* Card 1: Book and Pay */}
                    <div className="bg-slate-100 rounded-md shadow-xl shadow-violet-300 p-4">
                        <p className="text-lg font-light">
                        Excited about this event? Spare some time from your busy schedule and join the event. Secure your seat before it's too late! Click 'Book Now' below and make payment to reserve it. Don't miss out on this event!
                        </p>
                        <div className="mt-3 flex justify-center">
                            <Link to={`/payment/${event._id}`} className="bg-purple-500 text-white w-30 px-4 py-2 rounded hover:bg-purple-600 hover:text-green-950">
                                Book Now
                            </Link>
                        </div>
                    </div>

                    {/* Card 2: Give Feedback */}
                    <div className="bg-slate-100 rounded-md shadow-xl shadow-violet-300 p-4">
                        <p className="text-lg font-light">
                        Your feedback is invaluable! Share your experience and insights to assist fellow tenants in making informed decisions. Your review makes a difference – help us build a community of informed renters!
                        </p>
                        <div className="mt-3 flex justify-center">
                            <Link to="/Feedback" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 hover:text-green-950">
                                Give Your Feedback
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}