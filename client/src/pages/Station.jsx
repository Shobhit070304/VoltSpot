import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaPlug, FaBolt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaStar, FaCoffee, FaShoppingBag, FaWifi, FaRestroom } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { LocateIcon } from 'lucide-react';
import MapView from './MapView';

const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-red-100 text-red-800',
    Maintenance: 'bg-yellow-100 text-yellow-800'
};


function Station() {
    const { id } = useParams();
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStation = async () => {
            try {
                const response = await api.get(`/station/${id}`);
                if (response.status === 200) {
                    setStation(response.data.station);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStation();
    }, [id]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden py-[10vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        to="/home"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <FaChevronLeft className="mr-2" size={14} />
                        Back to all stations
                    </Link>
                </div>

                {/* Station Header */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-8 sm:px-8 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-900 p-4 rounded-lg">
                                <FaPlug className="text-blue-400" size={24} />
                            </div>
                            <div className="ml-5">
                                <h1 className="text-2xl font-bold text-white">{station?.name}</h1>
                                <div className="mt-1 flex items-center text-sm text-gray-400">
                                    <FaMapMarkerAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                                    {station?.location}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[station?.status]}`}>
                                {station?.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Station Details */}
                    <div className="lg:col-span-2">
                        {/* Station Information Card */}
                        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-700">
                                <h2 className="text-lg font-medium text-white">Station Information</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400">Power Output</h3>
                                        <div className="mt-1 flex items-center text-lg font-medium text-white">
                                            <FaBolt className="flex-shrink-0 mr-2 h-5 w-5 text-amber-400" />
                                            {station?.powerOutput} kW
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400">Connector Type</h3>
                                        <p className="mt-1 text-lg text-white">{station?.connectorType}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400">Availability</h3>
                                        <p className="mt-1 text-lg text-white">{station?.availability || '24/7'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400">Price</h3>
                                        <p className="mt-1 text-lg text-white">${station?.pricePerKwh}/kWh</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-400">Coordinates</h3>
                                        <p className="mt-1 text-gray-300">
                                            {station?.latitude}, {station?.longitude}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
                            <MapView station={station} />
                        </div>
                    </div>

                    {/* Right Column - Actions & Additional Info */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-700">
                                <h2 className="text-lg font-medium text-white">Current Status</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {station?.status === 'Active' ? (
                                            <FaCheckCircle className="h-8 w-8 text-green-500" />
                                        ) : (
                                            <FaTimesCircle className="h-8 w-8 text-red-500" />
                                        )}
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-sm font-medium text-gray-400">This station is currently</p>
                                        <p className="text-lg font-medium text-white">
                                            {station?.status === 'Active' ? 'Available for charging' : 'Unavailable'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 space-y-3">
                                    <button
                                        type="button"
                                        className={`w-full inline-flex justify-center rounded-lg border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${station?.status === 'Active'
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500'
                                            : 'bg-gray-600 cursor-not-allowed'
                                            }`}
                                        disabled={station?.status !== 'Active'}
                                    >
                                        {station?.status === 'Active' ? 'Start Charging Session' : 'Currently Unavailable'}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-lg border border-gray-600 px-4 py-3 text-base font-medium text-gray-200 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Report an Issue
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-700">
                                <h2 className="text-lg font-medium text-white">Amenities Nearby</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <FaCoffee className="h-5 w-5 text-gray-500" />
                                        <span className="ml-3 text-gray-300">Café (50m)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaShoppingBag className="h-5 w-5 text-gray-500" />
                                        <span className="ml-3 text-gray-300">Shopping (200m)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaWifi className="h-5 w-5 text-gray-500" />
                                        <span className="ml-3 text-gray-300">Free WiFi</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRestroom className="h-5 w-5 text-gray-500" />
                                        <span className="ml-3 text-gray-300">Restrooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-700">
                                <h2 className="text-lg font-medium text-white">User Reviews</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-600'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-400">4.2 (12 reviews)</span>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full inline-flex justify-center rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-200 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    Write a Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Station