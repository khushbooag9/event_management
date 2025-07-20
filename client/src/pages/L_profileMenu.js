import React from 'react';
import { Link } from 'react-router-dom';
import { useLandlord } from '../landlordContext';

export default function L_ProfileMenu() {
  const {landlord}= useLandlord();
  return (
    <div className="relative inline-block text-left">
      <div className="origin-top-right absolute right-0 mt-6 w-48 rounded-md mr-2 shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div className='px-4 py-2 font-bold text-lg'>
                        <h3>{landlord ? landlord.name : 'Guest'}</h3>
                    </div>
          <Link to="/UserProfile" className="font-bold block px-4 py-2 text-base text-gray-700 hover:bg-gray-100" role="menuitem">
            Profile
          </Link>
          <Link to="/AddEvent" className="block px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-100" role="menuitem">
            Add Event
          </Link>
          <Link to="/" className="font-bold block px-4 py-2 text-base text-gray-700 hover:bg-gray-100" role="menuitem">
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}
