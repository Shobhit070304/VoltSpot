import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaPlug, FaBolt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaStar, FaCoffee, FaShoppingBag, FaWifi, FaRestroom } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { LocateIcon } from 'lucide-react';


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
                    console.log(response.data.station);
                    toast.success('Station fetched successfully');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStation();
    }, [id]);

    const statusColors = {
        Active: "bg-emerald-100 text-emerald-800",
        Maintenance: "bg-amber-100 text-amber-800",
        Inactive: "bg-red-100 text-red-800"
    };
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <div className="mb-6">
                    <Link
                        to="/home"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <FaChevronLeft className="mr-2" size={14} />
                        Back to all stations
                    </Link>
                </div>

                {/* Station Header */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="px-6 py-8 sm:px-8 sm:flex sm:items-center sm:justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 bg-blue-100 p-4 rounded-lg">
                                <FaPlug className="text-blue-600" size={24} />
                            </div>
                            <div className="ml-5">
                                <h1 className="text-2xl font-bold text-gray-900">{station?.name}</h1>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <FaMapMarkerAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {station?.location}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusColors[station?.status]}`}>
                                {station?.status.charAt(0).toUpperCase() + station?.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Station Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Station Information</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Power Output</h3>
                                        <div className="mt-1 flex items-center text-lg font-medium text-gray-900">
                                            <FaBolt className="flex-shrink-0 mr-2 h-5 w-5 text-amber-400" />
                                            {station?.powerOutput} {station?.type}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Connector Type</h3>
                                        <p className="mt-1 text-lg text-gray-900">{station?.connectorType || 'Type 2'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                                        <p className="mt-1 text-lg text-gray-900">{station?.availability || '24/7'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Price</h3>
                                        <p className="mt-1 text-lg text-gray-900">{station?.price || '$0.35/kWh'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Location</h2>
                            </div>
                            <div className="p-4 h-64 bg-gray-100 flex items-center justify-center">
                                <div className="text-center">
                                    <FaMapMarkerAlt className="mx-auto h-12 w-12 text-red-500" />
                                    <p className="mt-2 text-gray-500">Map view of {station?.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Actions & Additional Info */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Current Status</h2>
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
                                        <p className="text-sm font-medium text-gray-500">This station is currently</p>
                                        <p className="text-lg font-medium text-gray-900">
                                            {station?.status === 'Active' ? 'Available' : 'Unavailable'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <button
                                        type="button"
                                        className={`w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm ${station?.status === 'Active' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                                        disabled={station?.status !== 'Active'}
                                    >
                                        {station?.status === 'Active' ? 'Start Charging Session' : 'Currently Unavailable'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">Amenities Nearby</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center">
                                        <FaCoffee className="h-5 w-5 text-gray-400" />
                                        <span className="ml-3 text-gray-700">Café</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaShoppingBag className="h-5 w-5 text-gray-400" />
                                        <span className="ml-3 text-gray-700">Shopping</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaWifi className="h-5 w-5 text-gray-400" />
                                        <span className="ml-3 text-gray-700">Free WiFi</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRestroom className="h-5 w-5 text-gray-400" />
                                        <span className="ml-3 text-gray-700">Restrooms</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200">
                                <h2 className="text-lg font-medium text-gray-900">User Reviews</h2>
                            </div>
                            <div className="px-6 py-5">
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <FaStar
                                                key={star}
                                                className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-gray-600">4.2 (12 reviews)</span>
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                >
                                    Write a Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Station