import React, { useState, useEffect } from 'react';
import { stationsApi } from '../services/api';
import { PlusCircle, Search, Filter, ChevronDown, Edit, Trash2, X } from 'lucide-react';
import StationForm from '../components/StationForm';
import { api } from '../services/api';
import { FaPlug } from 'react-icons/fa';



const ChargingStations = ({ }) => {
  const [stations, setStations] = useState([]);
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

  // Connector types for filter dropdown
  const connectorTypes = ['Type 1', 'Type 2', 'CCS', 'CHAdeMO', 'CCS/CHAdeMO', 'Tesla'];

  useEffect(() => {
    fetchStations();
  }, []);

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

  

  const createMockStations = () => {
    // Generate mock data for demonstration
    return [
      {
        id: 1,
        name: 'Downtown Fast Charger',
        location: '123 Main St, Downtown',
        latitude: 40.7128,
        longitude: -74.0060,
        status: 'Active',
        powerOutput: 150,
        connectorType: 'CCS',
        createdAt: '2023-04-10T14:30:00Z'
      },
      {
        id: 2,
        name: 'Riverside Charging Hub',
        location: 'Riverside Park, East Wing',
        latitude: 40.7214,
        longitude: -74.0120,
        status: 'Active',
        powerOutput: 50,
        connectorType: 'Type 2',
        createdAt: '2023-04-15T10:45:00Z'
      },
      {
        id: 3,
        name: 'Shopping Mall Charger',
        location: 'City Mall, Level P2',
        latitude: 40.7310,
        longitude: -73.9950,
        status: 'Inactive',
        powerOutput: 75,
        connectorType: 'CCS/CHAdeMO',
        createdAt: '2023-04-20T09:15:00Z'
      },
      {
        id: 4,
        name: 'North Station Fast Charge',
        location: '45 North Ave',
        latitude: 40.7350,
        longitude: -74.0200,
        status: 'Active',
        powerOutput: 350,
        connectorType: 'CCS',
        createdAt: '2023-04-22T16:30:00Z'
      },
      {
        id: 5,
        name: 'East Side Parking Charger',
        location: 'East Side Parking Garage, Level 1',
        latitude: 40.7180,
        longitude: -73.9830,
        status: 'Inactive',
        powerOutput: 22,
        connectorType: 'Type 2',
        createdAt: '2023-04-25T11:00:00Z'
      }
    ];
  };

  const handleAddStation = async (stationData) => {
    try {
      // In a real app, this would make an API call
      // const response = await stationsApi.create(stationData);

      // For demo, simulate API response
      const newStation = {
        ...stationData,
        id: stations.length + 1,
        createdAt: new Date().toISOString()
      };

      setStations([newStation, ...stations]);
      setShowForm(false);
      // Show success message
    } catch (err) {
      console.error('Error adding station:', err);
      // Show error message
    }
  };

  const handleUpdateStation = async (id, stationData) => {
    try {
      // In a real app, this would make an API call
      // const response = await stationsApi.update(id, stationData);

      // For demo, update locally
      const updatedStations = stations.map(station =>
        station.id === id ? { ...station, ...stationData } : station
      );

      setStations(updatedStations);
      setEditingStation(null);
      setShowForm(false);
      // Show success message
    } catch (err) {
      console.error('Error updating station:', err);
      // Show error message
    }
  };

  const handleDeleteStation = async (id) => {
    if (!confirm('Are you sure you want to delete this charging station?')) {
      return;
    }

    try {
      // In a real app, this would make an API call
      // await stationsApi.delete(id);

      // For demo, remove locally
      const updatedStations = stations.filter(station => station.id !== id);
      setStations(updatedStations);
      // Show success message
    } catch (err) {
      console.error('Error deleting station:', err);
      // Show error message
    }
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setShowForm(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      connectorType: '',
      minPower: '',
      maxPower: ''
    });
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Charging Stations</h1>
          <p className="text-gray-600 mt-1">Manage your network of charging stations</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => {
              setEditingStation(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Charging Station
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white shadow rounded-lg mb-6">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filters
                <ChevronDown className={`h-5 w-5 ml-2 text-gray-500 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Filter options */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700 mb-1">
                  Connector Type
                </label>
                <select
                  id="connectorType"
                  name="connectorType"
                  value={filters.connectorType}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">All Types</option>
                  {connectorTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="minPower" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>

              <div>
                <label htmlFor="maxPower" className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 hover:text-blue-900"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredStations.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredStations.map((station) => (
                <li key={station.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${station.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                          <FaPlug className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{station.name}</p>
                          <p className="text-sm text-gray-500">{station.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(station)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteStation(station._id)}
                          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${station.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {station.status}
                          </span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                            {station.powerOutput} kW
                          </span>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <span className="bg-blue-50 px-2 py-0.5 rounded text-xs text-blue-700">
                            {station.connectorType}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <FaPlug className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No charging stations found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No charging stations match your current filters.
              </p>
              {Object.values(filters).some(Boolean) && (
                <div className="mt-6">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editingStation ? 'Edit Charging Station' : 'Add New Charging Station'}
                    </h3>
                    <div className="mt-4">
                      <StationForm
                        initialData={editingStation}
                        onSubmit={(data) => {
                          if (editingStation) {
                            handleUpdateStation(editingStation.id, data);
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