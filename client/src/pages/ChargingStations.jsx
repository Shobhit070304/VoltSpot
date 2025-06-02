import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Filter, ChevronDown, Edit, Trash2, X } from 'lucide-react';
import StationForm from '../components/StationForm';
import { api } from '../services/api';
import { FaChevronRight, FaPlug } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Connector types for filter dropdown
const connectorTypes = ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'CCS/CHAdeMO', 'Tesla'];

const ChargingStations = ({ stations, setStations }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    connectorType: '',
    minPower: '',
    maxPower: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // // Fetch stations on mount
  // useEffect(() => {
  //   fetchStations();
  // }, []);

  // Handle add station
  const handleAddStation = async (stationData) => {
    try {
      const response = await api.post('/station/create', stationData);
      if (response.status === 200) {
        toast.success('Station created successfully');
        fetchStations();
        setShowForm(false);
        window.location.reload();
      }
      else {
        toast.error('Error creating station');
      }
    } catch (err) {
      console.error('Error adding station:', err);
      toast.error('Error adding station');
    }
  };

  // Handle update station
  const handleUpdateStation = async (id, stationData) => {
    try {
      const response = await api.put(`/station/update/${id}`, stationData);
      if (response.status === 200) {
        toast.success('Station updated successfully');
        fetchStations();
        setEditingStation(null);
        setShowForm(false);
        window.location.reload();
      }
      else {
        toast.error('Error updating station');
      }
    } catch (err) {
      console.error('Error updating station:', err);
      toast.error('Error updating station');
    }
  };

  // Handle delete station
  const handleDeleteStation = async (id) => {
    if (!confirm('Are you sure you want to delete this charging station?')) {
      return;
    }

    try {
      const response = await api.delete(`/station/delete/${id}`);
      if (response.status === 200) {
        toast.success('Station deleted successfully');
        setStations(stations.filter(station => station._id !== id));
        window.location.reload();
      }
      else {
        toast.error('Error deleting station');
      }
    } catch (err) {
      console.error('Error deleting station:', err);
      toast.error('Error deleting station');
    }
  };

  // Handle edit station
  const handleEdit = (station) => {
    setEditingStation(station);
    setShowForm(true);
  };

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
  //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
  //     <div className="md:flex md:items-center md:justify-between mb-6">
  //       <div>
  //         <h1 className="text-2xl font-bold text-gray-900">Charging Stations</h1>
  //         <p className="text-gray-600 mt-1">Manage your network of charging stations</p>
  //       </div>
  //       <div className="mt-4 md:mt-0">
  //         <button
  //           onClick={() => {
  //             setEditingStation(null);
  //             setShowForm(true);
  //           }}
  //           className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //         >
  //           <PlusCircle className="h-5 w-5 mr-2" />
  //           Add Charging Station
  //         </button>
  //       </div>
  //     </div>

  //     {/* Search and filters */}
  //     <div className="bg-white shadow rounded-lg mb-6">
  //       <div className="p-4 sm:p-6">
  //         <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
  //           <div className="relative flex-1">
  //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
  //               <Search className="h-5 w-5 text-gray-400" />
  //             </div>
  //             <input
  //               type="text"
  //               placeholder="Search stations..."
  //               value={searchTerm}
  //               onChange={handleSearch}
  //               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  //             />
  //           </div>
  //           <div>
  //             <button
  //               onClick={() => setShowFilters(!showFilters)}
  //               className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //             >
  //               <Filter className="h-5 w-5 mr-2 text-gray-500" />
  //               Filters
  //               <ChevronDown className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
  //             </button>
  //           </div>
  //         </div>

  //         {/* Filter options */}
  //         {showFilters && (
  //           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  //             <div>
  //               <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
  //                 Status
  //               </label>
  //               <select
  //                 id="status"
  //                 name="status"
  //                 value={filters.status}
  //                 onChange={handleFilterChange}
  //                 className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //               >
  //                 <option value="">All Statuses</option>
  //                 <option value="Active">Active</option>
  //                 <option value="Inactive">Inactive</option>
  //               </select>
  //             </div>

  //             <div>
  //               <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700 mb-1">
  //                 Connector Type
  //               </label>
  //               <select
  //                 id="connectorType"
  //                 name="connectorType"
  //                 value={filters.connectorType}
  //                 onChange={handleFilterChange}
  //                 className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //               >
  //                 <option value="">All Types</option>
  //                 {connectorTypes.map(type => (
  //                   <option key={type} value={type}>{type}</option>
  //                 ))}
  //               </select>
  //             </div>

  //             <div>
  //               <label htmlFor="minPower" className="block text-sm font-medium text-gray-700 mb-1">
  //                 Min Power (kW)
  //               </label>
  //               <input
  //                 type="number"
  //                 id="minPower"
  //                 name="minPower"
  //                 value={filters.minPower}
  //                 onChange={handleFilterChange}
  //                 placeholder="Min kW"
  //                 min="0"
  //                 className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //               />
  //             </div>

  //             <div>
  //               <label htmlFor="maxPower" className="block text-sm font-medium text-gray-700 mb-1">
  //                 Max Power (kW)
  //               </label>
  //               <input
  //                 type="number"
  //                 id="maxPower"
  //                 name="maxPower"
  //                 value={filters.maxPower}
  //                 onChange={handleFilterChange}
  //                 placeholder="Max kW"
  //                 min="0"
  //                 className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
  //               />
  //             </div>

  //             <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
  //               <button
  //                 onClick={clearFilters}
  //                 className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg text-white hover:bg-blue-700"
  //               >
  //                 <X className="h-4 w-4 mr-1" />
  //                 Clear Filters
  //               </button>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>



  //     {/* Station list */}
  //     {loading ? (
  //       <div className="flex justify-center items-center h-64">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  //       </div>
  //     ) : error ? (
  //       <div className="bg-red-50 border-l-4 border-red-500 p-4">
  //         <p className="text-red-700">{error}</p>
  //       </div>
  //     ) : (
  //       <div className="bg-white shadow overflow-hidden sm:rounded-md">
  //         {filteredStations.length > 0 ? (
  //           <ul className="divide-y divide-gray-200">
  //             {filteredStations.map((station) => (
  //               <li key={station._id}>
  //                 <div className="px-4 py-4 sm:px-6">
  //                   <div className="flex items-center justify-between">
  //                     <div className="flex items-center">
  //                       <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${station.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
  //                         }`}>
  //                         <FaPlug className="h-5 w-5" />
  //                       </div>
  //                       <div className="ml-4">
  //                         <p className="text-sm font-medium text-gray-900">{station.name}</p>
  //                         <p className="text-sm text-gray-500">{station.location}</p>
  //                       </div>
  //                     </div>
  //                     <div className="flex items-center space-x-2">
  //                       <button
  //                         onClick={() => handleEdit(station)}
  //                         className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //                       >
  //                         <Edit className="h-4 w-4" />
  //                         <span className="sr-only">Edit</span>
  //                       </button>
  //                       <button
  //                         onClick={() => handleDeleteStation(station._id)}
  //                         className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
  //                       >
  //                         <Trash2 className="h-4 w-4" />
  //                         <span className="sr-only">Delete</span>
  //                       </button>
  //                     </div>
  //                   </div>
  //                   <div className="mt-2 sm:flex sm:justify-between">
  //                     <div className="sm:flex">
  //                       <p className="flex items-center text-sm text-gray-500">
  //                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${station.status === 'Active'
  //                           ? 'bg-green-100 text-green-800'
  //                           : 'bg-yellow-100 text-yellow-800'
  //                           }`}>
  //                           {station.status}
  //                         </span>
  //                       </p>
  //                       <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
  //                         <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
  //                           {station.powerOutput} kW
  //                         </span>
  //                       </p>
  //                       <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
  //                         <span className="bg-blue-50 px-2 py-0.5 rounded text-xs text-blue-700">
  //                           {station.connectorType}
  //                         </span>
  //                       </p>
  //                     </div>
  //                       <Link to={`/station/${station._id}`} className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
  //                           Details <FaChevronRight className="inline ml-1" size={12} />
  //                         </Link>
  //                   </div>
  //                 </div>
  //               </li>
  //             ))}
  //           </ul>
  //         ) : (
  //           <div className="py-12 text-center">
  //             <FaPlug className="mx-auto h-12 w-12 text-gray-400" />
  //             <h3 className="mt-2 text-sm font-medium text-gray-900">No charging stations found</h3>
  //             <p className="mt-1 text-sm text-gray-500">
  //               No charging stations match your current filters.
  //             </p>
  //             {Object.values(filters).some(Boolean) && (
  //               <div className="mt-6">
  //                 <button
  //                   onClick={clearFilters}
  //                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  //                 >
  //                   Clear Filters
  //                 </button>
  //               </div>
  //             )}
  //           </div>
  //         )}
  //       </div>
  //     )}

  //     {/* Form modal */}
  //     {showForm && (
  //       <div className="fixed inset-0 overflow-y-auto z-50">
  //         <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
  //           <div className="fixed inset-0 transition-opacity" aria-hidden="true">
  //             <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
  //           </div>

  //           <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

  //           <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
  //             <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
  //               <div className="sm:flex sm:items-start">
  //                 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
  //                   <h3 className="text-lg leading-6 font-medium text-gray-900">
  //                     {editingStation ? 'Edit Charging Station' : 'Add New Charging Station'}
  //                   </h3>
  //                   <div className="mt-4">
  //                     <StationForm
  //                       initialData={editingStation}
  //                       onSubmit={(data) => {
  //                         if (editingStation) {
  //                           handleUpdateStation(editingStation._id, data);
  //                         } else {
  //                           handleAddStation(data);
  //                         }
  //                       }}
  //                       onCancel={() => {
  //                         setEditingStation(null);
  //                         setShowForm(false);
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );



  return (
    <div className="relative pt-[10vh]">
      {/* Header with Add Station button */}
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
            Charging Stations
          </h1>
          <p className="text-gray-400 mt-1">Manage your network of charging stations</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => {
              setEditingStation(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Charging Station
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg mb-6">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search stations..."
                value={searchTerm}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900/50 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-white"
              />
            </div>
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-200 bg-gray-700/50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-300" />
                Filters
                <ChevronDown className={`h-5 w-5 ml-2 text-gray-300 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-800 text-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="connectorType" className="block text-sm font-medium text-gray-300 mb-1">
                  Connector Type
                </label>
                <select
                  id="connectorType"
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-800 text-white"
                >
                  <option value="">All Types</option>
                  {connectorTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="minPower" className="block text-sm font-medium text-gray-300 mb-1">
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
                  className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div>
                <label htmlFor="maxPower" className="block text-sm font-medium text-gray-300 mb-1">
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
                  className="block w-full pl-3 pr-3 py-2 text-base border-2 border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-gray-800 text-white"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Station list */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 rounded-lg backdrop-blur-sm">
          <p className="text-red-400">{error}</p>
        </div>
      ) : (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {filteredStations.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filteredStations.map((station) => (
                <li key={station._id} className="hover:bg-gray-800/50 transition-colors">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${station.status === 'Active'
                            ? 'bg-green-900/30 text-green-400 border border-green-700/30'
                            : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30'
                          }`}>
                          <FaPlug className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{station.name}</p>
                          <p className="text-sm text-gray-400">{station.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(station)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteStation(station._id)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-400">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${station.status === 'Active'
                              ? 'bg-green-900/30 text-green-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                            }`}>
                            {station.status}
                          </span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                          <span className="bg-gray-700/50 px-2 py-0.5 rounded text-xs text-white">
                            {station.powerOutput} kW
                          </span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                          <span className="bg-blue-900/30 px-2 py-0.5 rounded text-xs text-blue-400">
                            {station.connectorType}
                          </span>
                        </p>
                      </div>
                      <Link
                        to={`/station/${station._id}`}
                        className="mt-2 sm:mt-0 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Details <FaChevronRight className="inline ml-1" size={12} />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <FaPlug className="mx-auto h-12 w-12 text-gray-500" />
              <h3 className="mt-2 text-sm font-medium text-gray-300">No charging stations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No charging stations match your current filters.
              </p>
              {Object.values(filters).some(Boolean) && (
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 overflow-y-auto z-50 mt-5">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700">
              <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-white">
                      {editingStation ? 'Edit Charging Station' : 'Add New Charging Station'}
                    </h3>
                    <div className="mt-4">
                      <StationForm
                        initialData={editingStation}
                        onSubmit={(data) => {
                          if (editingStation) {
                            handleUpdateStation(editingStation._id, data);
                          } else {
                            handleAddStation(data);
                          }
                        }}
                        onCancel={() => {
                          setEditingStation(null);
                          setShowForm(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );


};

export default ChargingStations;