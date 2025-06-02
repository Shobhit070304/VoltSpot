import React from "react";
import { Link } from "react-router-dom";
const LandingPage = () => {
    return (
        <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
                <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
            </div>

            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 py-32 text-center relative z-10 mt-[20vh]">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 leading-tight">
                    Powering the Future<br />of EV Charging
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                    The most advanced platform for managing electric vehicle charging stations worldwide.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        to="/home"
                        className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-lg"
                    >
                        Explore
                    </Link>
                    <Link
                        to="/"
                        className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
                    >
                        Learn More
                    </Link>
                </div>
            </section>

            {/* Stats Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
                {[
                    { value: "1.2K+", label: "Stations" },
                    { value: "25K+", label: "Daily Users" },
                    { value: "45+", label: "Cities" },
                    { value: "99.9%", label: "Uptime" },
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    >
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                            {stat.value}
                        </p>
                        <p className="text-gray-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <section className="max-w-4xl mx-auto px-6 py-16 relative z-10">
                <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
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
                            className="p-6 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
                        >
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-gray-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto px-6 py-16 text-center relative z-10">
                <div className="p-8 bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-lg shadow-lg hover:shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                        Ready to Supercharge Your EV Network?
                    </h2>
                    <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                        Join thousands of businesses already optimizing their charging infrastructure.
                    </p>
                    <Link
                        to="/login"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 inline-block shadow-lg"
                    >
                        Get Started — It's Free
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;