import React, { useEffect, useState } from 'react';
import {
  FaBolt,
  FaChevronRight,
  FaLocationArrow,
  FaPlug,
  FaSearch
} from 'react-icons/fa';
import { api } from "../services/api"
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ChevronDown, Filter, Search, X } from 'lucide-react';

// Connector types for filter dropdown
const connectorTypes = ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'CCS/CHAdeMO', 'Tesla'];

const Home = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    connectorType: '',
    minPower: '',
    maxPower: ''
  });
  const [showFilters, setShowFilters] = useState(false);



  // Status colors mapping
  const statusColors = {
    Active: "bg-emerald-100 text-emerald-800",
    Maintenance: "bg-amber-100 text-amber-800",
    Inactive: "bg-red-100 text-red-800"
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await api.get('/station');
        if (response.status === 200) {
          setStations(response.data);
          toast.success('Stations fetched successfully');
        }
      } catch (error) {
        setError(error);
        toast.error('Error fetching stations');
      } finally {
        setLoading(false);
      }
    };
    fetchStations();
  }, []);


  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      status: '',
      connectorType: '',
      minPower: '',
      maxPower: ''
    });
  };

  // Filter stations
  const filteredStations = stations.filter(station => {
    // Search filter
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = !filters.status || station.status === filters.status;

    // Connector type filter
    const matchesConnector = !filters.connectorType || station.connectorType === filters.connectorType;

    // Power output range filter
    const matchesMinPower = !filters.minPower || station.powerOutput >= Number(filters.minPower);
    const matchesMaxPower = !filters.maxPower || station.powerOutput <= Number(filters.maxPower);

    return matchesSearch && matchesStatus && matchesConnector && matchesMinPower && matchesMaxPower;
  });
  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  //       {/* Header */}
  //       <div className="flex flex-col items-center justify-center text-center py-10 bg-white">
  //         <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
  //           Explore EV Charging Stations
  //         </h1>
  //         <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl">
  //           Find and compare electric vehicle charging stations near you. Get details on location, availability, charging types, and more — all in one place.
  //         </p>
  //       </div>

  //       {/* Search and filters */}
  //       <div className="bg-white shadow rounded-lg mb-6">
  //         <div className="p-4 sm:p-6">
  //           <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
  //             <div className="relative flex-1">
  //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //                 <Search className="h-5 w-5 text-gray-400" />
  //               </div>
  //               <input
  //                 type="text"
  //                 placeholder="Search stations..."
  //                 value={searchTerm}
  //                 onChange={handleSearch}
  //                 className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //               />
  //             </div>
  //             <div>
  //               <button
  //                 onClick={() => setShowFilters(!showFilters)}
  //                 className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //               >
  //                 <Filter className="h-5 w-5 mr-2 text-gray-500" />
  //                 Filters
  //                 <ChevronDown className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
  //               </button>
  //             </div>
  //           </div>

  //           {/* Filter options */}
  //           {showFilters && (
  //             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  //               <div>
  //                 <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Status
  //                 </label>
  //                 <select
  //                   id="status"
  //                   name="status"
  //                   value={filters.status}
  //                   onChange={handleFilterChange}
  //                   className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //                 >
  //                   <option value="">All Statuses</option>
  //                   <option value="Active">Active</option>
  //                   <option value="Inactive">Inactive</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Connector Type
  //                 </label>
  //                 <select
  //                   id="connectorType"
  //                   name="connectorType"
  //                   value={filters.connectorType}
  //                   onChange={handleFilterChange}
  //                   className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //                 >
  //                   <option value="">All Types</option>
  //                   {connectorTypes.map(type => (
  //                     <option key={type} value={type}>{type}</option>
  //                   ))}
  //                 </select>
  //               </div>

  //               <div>
  //                 <label htmlFor="minPower" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Min Power (kW)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   id="minPower"
  //                   name="minPower"
  //                   value={filters.minPower}
  //                   onChange={handleFilterChange}
  //                   placeholder="Min kW"
  //                   min="0"
  //                   className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //                 />
  //               </div>

  //               <div>
  //                 <label htmlFor="maxPower" className="block text-sm font-medium text-gray-700 mb-1">
  //                   Max Power (kW)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   id="maxPower"
  //                   name="maxPower"
  //                   value={filters.maxPower}
  //                   onChange={handleFilterChange}
  //                   placeholder="Max kW"
  //                   min="0"
  //                   className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //                 />
  //               </div>

  //               <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
  //                 <button
  //                   onClick={clearFilters}
  //                   className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg text-white hover:bg-blue-700"
  //                 >
  //                   <X className="h-4 w-4 mr-1" />
  //                   Clear Filters
  //                 </button>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {/* Stations List */}
  //       <div>
  //         <div className="flex items-center justify-between mb-4">
  //           <h2 className="text-lg font-medium text-gray-900">Charging Stations</h2>
  //         </div>

  //         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
  //           <ul className="divide-y divide-gray-200">
  //             {filteredStations.length > 0 ? (

  //               filteredStations.map((station) => (
  //                 <li key={station._id}>
  //                   <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
  //                     <div className="flex items-center justify-between">
  //                       <div className="flex items-center">
  //                       <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${station.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
  //                         }`}>
  //                         <FaPlug className="h-5 w-5" />
  //                       </div>
  //                         <div className="ml-4">
  //                           <h3 className="text-lg leading-6 font-medium text-gray-900">
  //                             {station.name}
  //                           </h3>
  //                           <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
  //                             <div className="mt-2 flex items-center text-sm text-gray-500">
  //                               <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
  //                               {station.location}
  //                             </div>
  //                             <div className="mt-2 flex items-center text-sm text-gray-500">
  //                               <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
  //                               {station.powerOutput} {station.type}
  //                             </div>
  //                           </div>
  //                         </div>
  //                       </div>
  //                       <div className="flex items-center">
  //                         <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[station.status]}`}>
  //                           {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
  //                         </span>
  //                         <Link to={`/station/${station._id}`} className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
  //                           Details <FaChevronRight className="inline ml-1" size={12} />
  //                         </Link>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </li>
  //               ))

  //             ) : (
  //               <div className="p-6 text-center text-gray-500">
  //                 No stations found.
  //               </div>
  //             )}
  //           </ul>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );



  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  //     {/* Hero Section */}
  //     <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
  //         <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
  //           Explore EV Charging Stations
  //         </h1>
  //         <p className="text-xl text-blue-100 max-w-3xl mx-auto">
  //           Find and compare electric vehicle charging stations near you. Get real-time details on location, availability, and charging types.
  //         </p>
  //       </div>
  //       <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
  //     </div>

  //     {/* Main Content */}
  //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
  //       {/* Search and Filters Card */}
  //       <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 border border-gray-200">
  //         <div className="p-6">
  //           <div className="flex flex-col sm:flex-row gap-4 items-center">
  //             {/* Search Input */}
  //             <div className="relative flex-1 w-full">
  //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //                 <Search className="h-5 w-5 text-gray-400" />
  //               </div>
  //               <input
  //                 type="text"
  //                 placeholder="Search stations by name or location..."
  //                 value={searchTerm}
  //                 onChange={handleSearch}
  //                 className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
  //               />
  //             </div>

  //             {/* Filter Toggle Button */}
  //             <button
  //               onClick={() => setShowFilters(!showFilters)}
  //               className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  //             >
  //               <Filter className="h-5 w-5 mr-2 text-gray-500" />
  //               Filters
  //               <ChevronDown className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
  //             </button>
  //           </div>

  //           {/* Filter Options */}
  //           {showFilters && (
  //             <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  //               {/* Status Filter */}
  //               <div>
  //                 <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Status
  //                 </label>
  //                 <select
  //                   id="status"
  //                   name="status"
  //                   value={filters.status}
  //                   onChange={handleFilterChange}
  //                   className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
  //                 >
  //                   <option value="">All Statuses</option>
  //                   <option value="Active">Active</option>
  //                   <option value="Inactive">Inactive</option>
  //                 </select>
  //               </div>

  //               {/* Connector Type Filter */}
  //               <div>
  //                 <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Connector Type
  //                 </label>
  //                 <select
  //                   id="connectorType"
  //                   name="connectorType"
  //                   value={filters.connectorType}
  //                   onChange={handleFilterChange}
  //                   className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
  //                 >
  //                   <option value="">All Types</option>
  //                   {connectorTypes.map(type => (
  //                     <option key={type} value={type}>{type}</option>
  //                   ))}
  //                 </select>
  //               </div>

  //               {/* Power Range Filters */}
  //               <div>
  //                 <label htmlFor="minPower" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Min Power (kW)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   id="minPower"
  //                   name="minPower"
  //                   value={filters.minPower}
  //                   onChange={handleFilterChange}
  //                   placeholder="Min kW"
  //                   min="0"
  //                   className="block w-full pl-3 pr-3 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
  //                 />
  //               </div>

  //               <div>
  //                 <label htmlFor="maxPower" className="block text-sm font-medium text-gray-700 mb-2">
  //                   Max Power (kW)
  //                 </label>
  //                 <input
  //                   type="number"
  //                   id="maxPower"
  //                   name="maxPower"
  //                   value={filters.maxPower}
  //                   onChange={handleFilterChange}
  //                   placeholder="Max kW"
  //                   min="0"
  //                   className="block w-full pl-3 pr-3 py-2 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
  //                 />
  //               </div>

  //               {/* Clear Filters Button */}
  //               <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
  //                 <button
  //                   onClick={clearFilters}
  //                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
  //                 >
  //                   <X className="h-4 w-4 mr-1" />
  //                   Clear Filters
  //                 </button>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>

  //       {/* Stations List Section */}
  //       <div className="mb-12">
  //         <div className="flex items-center justify-between mb-6">
  //           <h2 className="text-2xl font-semibold text-gray-800">Available Charging Stations</h2>
  //           <span className="text-sm text-gray-500">
  //             {filteredStations.length} {filteredStations.length === 1 ? 'station' : 'stations'} found
  //           </span>
  //         </div>

  //         {/* Stations List */}
  //         {filteredStations.length > 0 ? (
  //           <div className="space-y-4">
  //             {filteredStations.map((station) => (
  //               <div
  //                 key={station._id}
  //                 className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
  //               >
  //                 <div className="p-6">
  //                   <div className="flex flex-col md:flex-row md:items-center justify-between">
  //                     {/* Station Info */}
  //                     <div className="flex items-start space-x-4">
  //                       <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${station.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
  //                         <FaPlug className="h-5 w-5" />
  //                       </div>
  //                       <div>
  //                         <h3 className="text-lg font-semibold text-gray-900">{station.name}</h3>
  //                         <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
  //                           <div className="flex items-center text-sm text-gray-600">
  //                             <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
  //                             {station.location}
  //                           </div>
  //                           <div className="flex items-center text-sm text-gray-600">
  //                             <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
  //                             {station.powerOutput} kW • {station.type}
  //                           </div>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     {/* Status and Details */}
  //                     <div className="mt-4 md:mt-0 flex items-center space-x-4">
  //                       <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[station.status]}`}>
  //                         {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
  //                       </span>
  //                       <Link
  //                         to={`/station/${station._id}`}
  //                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
  //                       >
  //                         View Details <FaChevronRight className="inline ml-1" size={12} />
  //                       </Link>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         ) : (
  //           <div className="bg-white rounded-xl shadow-sm p-12 text-center">
  //             <div className="mx-auto h-24 w-24 text-gray-400">
  //               <FaSearch className="w-full h-full" />
  //             </div>
  //             <h3 className="mt-4 text-lg font-medium text-gray-900">No stations found</h3>
  //             <p className="mt-2 text-sm text-gray-500">
  //               Try adjusting your search or filter criteria
  //             </p>
  //             <div className="mt-6">
  //               <button
  //                 onClick={clearFilters}
  //                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
  //               >
  //                 Clear all filters
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );




  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 overflow-hidden pt-[20vh]">
      {/* Background glow effects - same as landing page */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-blue-900/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-[100px]"></div>
      </div>
  
      {/* Hero Section - matching landing page style */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 leading-tight">
          Explore EV Charging Stations
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          Find and compare electric vehicle charging stations near you with real-time availability.
        </p>
      </section>
  
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-16">
        {/* Search and Filters Card - styled to match landing page components */}
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm mb-8 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-sm font-medium text-gray-200 bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              Filters
              <ChevronDown className={`h-5 w-5 ml-2 text-gray-400 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
  
          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="bg-gray-800">All Statuses</option>
                  <option value="Active" className="bg-gray-800">Active</option>
                  <option value="Inactive" className="bg-gray-800">Inactive</option>
                </select>
              </div>
  
              {/* Connector Type Filter */}
              <div>
                <label htmlFor="connectorType" className="block text-sm font-medium text-gray-300 mb-2">
                  Connector Type
                </label>
                <select
                  id="connectorType"
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" className="bg-gray-800">All Types</option>
                  {connectorTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-800">{type}</option>
                  ))}
                </select>
              </div>
  
              {/* Power Range Filters */}
              <div>
                <label htmlFor="minPower" className="block text-sm font-medium text-gray-300 mb-2">
                  Min Power (kW)
                </label>
                <input
                  type="number"
                  id="minPower"
                  name="minPower"
                  value={filters.minPower}
                  onChange={handleFilterChange}
                  placeholder="Min kW"
                  min="0"
                  className="block w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              <div>
                <label htmlFor="maxPower" className="block text-sm font-medium text-gray-300 mb-2">
                  Max Power (kW)
                </label>
                <input
                  type="number"
                  id="maxPower"
                  name="maxPower"
                  value={filters.maxPower}
                  onChange={handleFilterChange}
                  placeholder="Max kW"
                  min="0"
                  className="block w-full pl-3 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
  
              {/* Clear Filters Button */}
              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
  
        {/* Stations List Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Available Stations
            </h2>
            <span className="text-sm text-gray-400">
              {filteredStations.length} {filteredStations.length === 1 ? 'station' : 'stations'} found
            </span>
          </div>
  
          {/* Stations List */}
          {filteredStations.length > 0 ? (
            <div className="space-y-4">
              {filteredStations.map((station) => (
                <div 
                  key={station._id} 
                  className="bg-gray-800/30 rounded-xl border border-gray-700 bg-gray-700/20 backdrop-blur-lg hover:bg-gray-800/50 transition-all duration-300 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    {/* Station Info */}
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${station.status === 'Active' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'}`}>
                        <FaPlug className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{station.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                          <div className="flex items-center text-sm text-gray-400">
                            <FaLocationArrow className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-500" />
                            {station.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-400">
                            <FaBolt className="flex-shrink-0 mr-1.5 h-4 w-4 text-amber-400" />
                            {station.powerOutput} kW • {station.type}
                          </div>
                        </div>
                      </div>
                    </div>
  
                    {/* Status and Details */}
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${station.status === 'Active' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'}`}>
                        {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                      </span>
                      <Link 
                        to={`/station/${station._id}`} 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        View Details <FaChevronRight className="inline ml-1" size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 backdrop-blur-sm p-12 text-center">
              <div className="mx-auto h-24 w-24 text-gray-500">
                <FaSearch className="w-full h-full" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">No stations found</h3>
              <p className="mt-2 text-sm text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default Home;