// Features.js
import React from 'react';

const Features = () => {
    const features = [
        {
            title: "Discover Events",
            description: "Explore a wide variety of events including concerts, workshops, conferences, and more happening around you. Filter by category, location, and date to find events you'll love.",
            icon: "🎉"
        },
        {
            title: "Book Tickets Instantly",
            description: "Book tickets for your favorite events quickly and securely through our online booking system. Choose your seats, make payments, and receive instant confirmations.",
            icon: "🎟️"
        },
        {
            title: "Create & Manage Events",
            description: "Organizers can easily create and publish events, manage attendee lists, set ticket prices, and track bookings — all from one convenient dashboard.",
            icon: "🗓️"
        },
        {
            title: "Personalized Recommendations",
            description: "Get event suggestions tailored to your interests. Enable notifications to stay updated on events you might love and never miss out on exciting opportunities.",
            icon: "✨"
        },
        {
            title: "Networking Opportunities",
            description: "Connect with other attendees and organizers through our integrated networking features. Expand your professional and social circles while enjoying events.",
            icon: "🤝"
        },
        {
            title: "Secure Payments & Support",
            description: "Enjoy smooth and secure transactions with multiple payment options. Our dedicated support team is always ready to help with any issues or queries.",
            icon: "💳"
        }
    ];

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Features of Eventz</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-6">
                        <div className="text-6xl mb-4 text-center">{feature.icon}</div>
                        <h2 className="text-2xl font-bold mb-2 text-center">{feature.title}</h2>
                        <p className="text-lg text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;