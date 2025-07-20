// Contact.js
import React from 'react';

const Contact = () => {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 rounded-md"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded-md"
                />
                <textarea
                    placeholder="Message"
                    className="border p-2 rounded-md h-32"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
