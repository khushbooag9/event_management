import React, { useState } from 'react';
import { indiaData } from './LocationData';

export default function SearchBar({ onSearch }) {
    const [location, setLocation] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const cities = Object.keys(indiaData).reduce((acc, state) => {
        indiaData[state].forEach(city => {
            acc.push(`${city}, ${state}`);
        });
        return acc;
    }, []);

    const handleSearch = () => {
        onSearch(location || searchInput);
    };

    return (
        <div className="flex border border-gray-900 rounded-full shadow-md shadow-gray-300 mx-auto mt-6 w-3/4 bg-[#e3d7f0] gap-1">
            <select
                name="location"
                id="location"
                className="cursor-pointer p-3 text-lg border-none bg-[#e3d7f0] rounded-l-full w-40"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value="">Location</option>
                {cities.map((loc, index) => (
                    <option key={index} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>
            <div className='border border-gray-500 bg-gray'></div>
            <input
                type="text"
                placeholder="Search for locality"
                name="search"
                className="flex-grow p-3 text-lg bg-[#e3d7f0] hover:bg-[#e3d7f0]"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
                type="button"
                onClick={handleSearch}
                className="bg-[#a1c8ff] text-white p-3 rounded-full hover:bg-[#3e99d2] hover:rounded-full transition-colors mr-2 flex items-center justify-center mt-1 mb-1 border-black-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </div>
    );
}
