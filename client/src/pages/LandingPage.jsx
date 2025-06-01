import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Powering the Future<br />of EV Charging
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                    The most advanced platform for managing electric vehicle charging stations worldwide.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/home" className="px-10 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                        Explore
                    </Link>
                    <Link to="/" className="px-6 py-2 border border-gray-300 rounded-md font-medium hover:bg-gray-50">
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                    { value: "1.2K+", label: "Stations" },
                    { value: "25K+", label: "Daily Users" },
                    { value: "45+", label: "Cities" },
                    { value: "99.9%", label: "Uptime" },
                ].map((stat, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                            {stat.value}
                        </p>
                        <p className="text-gray-600 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    Advanced Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: "⚡",
                            title: "Real-Time Monitoring",
                            desc: "Track charging sessions, power usage, and station health in real-time.",
                        },
                        {
                            icon: "🌍",
                            title: "Global Network",
                            desc: "Access thousands of stations across multiple countries.",
                        },
                        {
                            icon: "🔌",
                            title: "Smart Charging",
                            desc: "AI-powered load balancing for optimal energy distribution.",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 bg-gray-100 rounded-lg"
                        >
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center">
                <div className="p-8 bg-gray-100 rounded-xl border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4">
                        Ready to Supercharge Your EV Network?
                    </h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Join thousands of businesses already optimizing their charging infrastructure.
                    </p>
                    <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
                        Get Started — It's Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;