import { useState, useEffect, useMemo } from "react";
import { api } from "../../services/api";
import {
  Zap,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  MapPin,
  Activity,
  Star,
  Sparkles,
  Battery,
  Users,
  Clock,
} from "lucide-react";
import ChargingStations from "../stations/ChargingStations";
import StationForm from "../../components/forms/StationForm";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import RecentlyViewed from "../../components/widgets/RecentlyViewed";
import Pagination from "../../components/Home/Pagination";

const Dashboard = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

    const paginatedData = useMemo(() => {
    const totalPages = Math.ceil(stations.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = stations.slice(startIndex, startIndex + itemsPerPage);
    return { totalPages, currentItems };
  }, [stations, currentPage, itemsPerPage]);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/station/me");

      if (response.status === 200) {
        const stationsData = response.data.stations || [];
        setStations(stationsData);

        const statsData = {
          totalStations: stationsData.length,
          activeStations: stationsData.filter(
            (station) => station.status === "Active"
          ).length,
          inactiveStations: stationsData.filter(
            (station) => station.status === "Inactive"
          ).length,
          avgPowerOutput:
            stationsData.length > 0
              ? stationsData.reduce(
                (sum, station) => sum + (station.powerOutput || 0),
                0
              ) / stationsData.length
              : 0,
          totalPower: stationsData.reduce(
            (sum, station) => sum + (station.powerOutput || 0),
            0
          ),
          avgRating:
            stationsData.length > 0
              ? stationsData.reduce(
                (sum, station) => sum + (station.averageRating || 0),
                0
              ) / stationsData.length
              : 0,
        };
        setStats(statsData);
      }
    } catch (error) {
      setError(error);
      toast.error(error.message || "Error fetching stations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const handleAddStation = async (stationData) => {
    try {
      const response = await api.post("/station/create", stationData);
      if (response.status === 200) {
        toast.success("Station created successfully");
        fetchStations();
        setShowForm(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating station");
    }
  };

  const handleUpdateStation = async (id, stationData) => {
    try {
      const response = await api.put(`/station/update/${id}`, stationData);
      if (response.status === 200) {
        toast.success("Station updated successfully");
        fetchStations();
        setEditingStation(null);
        setShowForm(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating station");
    }
  };

  const handleEdit = (station) => {
    setEditingStation(station);
    setShowForm(true);
  };

  const handleShowAddForm = () => {
    setEditingStation(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        </div>

        {/* Loading Spinner */}
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-200 border-t-amber-500 mb-4"></div>
          <p className="text-sm text-orange-700 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
          <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
        </div>

        {/* Error Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-200 p-6 max-w-md mx-6 shadow-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Error Loading Dashboard
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {error.message ||
                  "Failed to fetch dashboard data. Please try again later."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden py-[6%]">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-medium mb-3">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                NETWORK OVERVIEW
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Network Dashboard
                </span>
              </h1>
              <p className="text-base text-gray-600">
                Overview and management of your charging infrastructure
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShowAddForm}
                className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg shadow-md hover:shadow-orange-500/20 transition-all text-sm font-medium"
              >
                Add Station
              </button>
              <Link
                to="/map"
                className="inline-flex items-center px-4 py-2.5 bg-white border border-orange-200 hover:border-orange-300 text-orange-700 rounded-lg shadow-sm hover:shadow-md transition-all text-sm font-medium"
              >
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Link>
              <Link
                to="/stations"
                className="inline-flex items-center px-4 py-2.5 bg-white border border-orange-200 hover:border-orange-300 text-orange-700 rounded-lg shadow-sm hover:shadow-md transition-all text-sm font-medium"
              >
                <Activity className="h-4 w-4 mr-2" />
                All Stations
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Stations */}
          <StatCard
            icon={<Zap className="h-5 w-5 text-orange-500" />}
            value={stats.totalStations}
            label="Total Stations"
            change="+12%"
            description="Across your network"
            bgColor="from-orange-50 to-white"
          />

          {/* Active Stations */}
          <StatCard
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
            value={stats.activeStations}
            label="Active Stations"
            change="+5%"
            description="Ready for charging"
            bgColor="from-green-50 to-white"
          />

          {/* Total Power */}
          <StatCard
            icon={<Battery className="h-5 w-5 text-blue-500" />}
            value={`${stats.totalPower.toFixed(0)} kW`}
            label="Total Power"
            change="+8%"
            description="Combined capacity"
            bgColor="from-blue-50 to-white"
          />

          {/* Average Rating */}
          <StatCard
            icon={<Star className="h-5 w-5 text-amber-500" />}
            value={stats.avgRating.toFixed(1)}
            label="Avg Rating"
            change="+0.2"
            description="Customer satisfaction"
            bgColor="from-amber-50 to-white"
          />
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={paginatedData.totalPages}
          setCurrentPage={setCurrentPage}
        />
        <div className="w-full flex justify-between gap-5">
          <div className="w-[30%]">
            <RecentlyViewed />
          </div>
          {/* Charging Stations Management */}
          <div className="bg-amber-100 w-[70%] backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden py-5 px-2">
            <div className="px-6 border-b border-orange-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Your Charging Stations
              </h2>
            </div>
            <ChargingStations
              stations={paginatedData.currentItems}
              setStations={setStations}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>

      {/* Station Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white/90 backdrop-blur-lg rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-orange-100">
              <div className="px-6 py-5 border-b border-orange-100">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingStation ? "Edit Station" : "Add New Station"}
                </h3>
              </div>
              <div className="px-6 py-4">
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
      )}
    </div>
  );
};

const StatCard = ({ icon, value, label, change, description, bgColor }) => (
  <div
    className={`bg-gradient-to-b ${bgColor} rounded-xl border border-orange-100 p-5 hover:shadow-md transition-all`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="text-right">
        <div className="text-xs font-medium text-green-600">{change}</div>
        <div className="text-xs text-gray-500">vs last month</div>
      </div>
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

export default Dashboard;
