import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './Logo.png';
import Footer from '../Footer';
import L_ProfileMenu from './L_profileMenu';
import axios from 'axios';

const AdminPage = ({ children }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prevState => !prevState);
  };

  const handleCardClick = (eventId) => {
    navigate(`/a_event/${eventId}`);
};

  React.useEffect(() => {
    const fetchEvents = async () => {
        try {
            const adminId = localStorage.getItem('adminId');
            const response = await axios.get(`https://event-management-y1ne.onrender.com/a_events/${adminId}`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    fetchEvents();
}, []);

  const handleUpdateClick = (id) => {
    navigate(`/UpdateEvent/${id}`);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://event-management-y1ne.onrender.com/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      alert('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" className="w-12 h-12" />
        </div>
        <div className="header-right">
          <button className='menu-button bg-inherit border-0 text-2xl text-white cursor-pointer mr-8 hover:font-semibold ' onClick={toggleProfileMenu}>☰ Menu</button>
          {isProfileMenuOpen && <L_ProfileMenu />}
        </div>
      </header>
      <main className="flex-grow p-4">
        {children}
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-6 ml-3 mb-2 rounded hover:bg-blue-600"
            onClick={() => navigate(`/AddEvent`)}
          >
            + Add new Event
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {events.length === 0 ? (
            <p className="text-center col-span-full">No events.</p>
          ) : (
            events.map(event => (
              <div key={event.id}  className="property-card bg-white shadow-md rounded-lg overflow-hidden">
                <img src={`http://localhost:4000${event.image}`} alt={event.name} className="property-image p-1 w-full h-72 object-cover" onClick={() => handleCardClick(event._id)}/>
                <div className="property-details p-3 pt-2 " onClick={() => handleCardClick(event._id)}>
                  <h3 className="property-name text-lg font-bold">{event.name}</h3>
                  <p className="property-location text-gray-600 font-semibold">{event.address}</p>
                  <p className="property-price text-gray-600 font-semibold">₹{event.price}/-</p>
                </div>
                <div className="flex justify-between px-3 pb-3">
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
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};


export default AdminPage;

