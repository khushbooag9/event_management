import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css'
import { useNavigate } from 'react-router-dom';

export default function A_EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`/a_event/${id}`).then(response => {
            setEvent(response.data);
        });
    }, [id]);

    if (!event) return <div>Loading...</div>;


      const handleUpdateClick = (id) => {
        navigate(`/UpdateEvent/${id}`);
      };
    
      const handleDeleteClick = async (id) => {
        try {
          await axios.delete(`/events/${id}`);
          setEvent(event.filter((event) => event._id !== id));
          alert('Event deleted successfully');
        } catch (error) {
          console.error('Error deleting event:', error);
          alert('Error deleting event. Please try again.');
        }
      };

    return (
        <div className="p-10 pt-4 mt-10">
            <div className="bg-violet-400 rounded-md shadow-2xl p-4 pt-1 max-w-7xl ml-52 mr-52">
                <h1 className="text-5xl font-bold mt-2 ml-2">{event.name}</h1>
                <p className="text-sm text-gray-500 ml-2 mt-2">Added on: {new Date(event.date_added).toLocaleDateString()}</p>
                <p className="text-lg mt-2 font-semibold">Event Date: {event.rooms ? new Date(event.rooms).toLocaleDateString() : ''}</p>
                <p className="text-lg mt-2 font-semibold">Venue: {event.address}</p>
                <p className="text-lg font-semibold">Price: ₹{event.price}/-</p>
                <p className="text-lg mt-2 font-semibold bg-green-400">Participants Booked: {event.bookingsCount}</p>
                <div className="flex justify-between px-3 pb-3 mt-6">
                <button
                    onClick={() => handleUpdateClick(event._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
            </div>
        </div>
    );
}