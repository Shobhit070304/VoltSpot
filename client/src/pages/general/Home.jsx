import React, { useEffect, useState, useCallback, useMemo } from "react";
import { api } from "../../services/api";
import toast from "react-hot-toast";
import Header from "../../components/Home/Header";
import SearchFilterCard from "../../components/Home/SearchFilterCard";
import StationsList from "../../components/Home/StationsList";
import QuickStats from "../../components/Home/QuickStats";
import { useAuth } from "../../context/AuthContext";
import { ArrowRight, LayoutGrid, Link, List, Zap } from "lucide-react";
import Pagination from "../../components/Home/Pagination";

const Home = () => {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filters, setFilters] = useState({
        status: "",
        connectorType: "",
        minPower: "",
        maxPower: "",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { user, setUser } = useAuth();

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Debounce filters
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedFilters(filters);
        }, 300);
        return () => clearTimeout(timer);
    }, [filters]);

    // Reset page when search term or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchTerm, debouncedFilters]);

    const fetchStations = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);
            if (debouncedFilters.status) params.append("status", debouncedFilters.status);
            if (debouncedFilters.connectorType) params.append("connectorType", debouncedFilters.connectorType);
            if (debouncedFilters.minPower) params.append("minPower", debouncedFilters.minPower);
            if (debouncedFilters.maxPower) params.append("maxPower", debouncedFilters.maxPower);

            const response = await api.get(`/station?${params.toString()}`);
            if (response.status === 200) {
                setStations(response.data.stations);
            }
        } catch (error) {
            // Component-level error handling
            toast.error("Failed to fetch stations");
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm, debouncedFilters]);

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            status: "",
            connectorType: "",
            minPower: "",
            maxPower: "",
        });
        setSearchTerm("");
        setCurrentPage(1); // Reset to first page when clearing filters
    };

    const handleSaveStation = async (stationId) => {
        if (!user) {
            toast.error("Please login to save stations");
            return;
        }

        try {
            const response = await api.post(`/station/save/${stationId}`);
            if (response.status === 200) {
                setUser(response.data.user);
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error saving station");
        }
    };

    const stats = {
        total: stations.length,
        active: stations.filter((s) => s.status === "Active").length,
        avgPower: stations.length
            ? (stations.reduce((acc, s) => acc + s.powerOutput, 0) / stations.length).toFixed(0)
            : 0,
        connectors: [...new Set(stations.map((s) => s.connectorType))].length,
    };

    const paginatedData = useMemo(() => {
        const totalPages = Math.ceil(stations.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const currentItems = stations.slice(startIndex, startIndex + itemsPerPage);
        return { totalPages, currentItems };
    }, [stations, currentPage, itemsPerPage]);

    const connectorTypes = [...new Set(stations.map((s) => s.connectorType))].filter(Boolean);

    return (
        <div className="min-h-screen bg-midnight text-white pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid opacity-20 animate-move-grid" />
            <div className="absolute inset-0 grid-dots opacity-40 animate-move-grid [animation-duration:10s]" />

            {/* Aurora Background Effect */}
            <div className="fixed inset-0 bg-aurora pointer-events-none opacity-20" />

            <main className="relative z-10 max-w-6xl mx-auto">
                <Header />

                <div className="mb-12">
                    <QuickStats stats={stats} />
                </div>

                <div className="space-y-10">
                    <SearchFilterCard
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        filters={filters}
                        handleFilterChange={handleFilterChange}
                        clearFilters={clearFilters}
                        connectorTypes={connectorTypes}
                        showSuggestions={showSuggestions}
                        setShowSuggestions={setShowSuggestions}
                    />

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                                {stations.length} Stations Found
                            </h2>
                        </div>
                        <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-lg transition-all ${viewMode === "grid" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-slate-500 hover:text-white"}`}
                            >
                                <LayoutGrid size={14} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-lg transition-all ${viewMode === "list" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-slate-500 hover:text-white"}`}
                            >
                                <List size={14} />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="glass-panel h-40 animate-pulse bg-white/[0.02] border-white/5" />
                            ))}
                        </div>
                    ) : stations.length === 0 ? (
                        <div className="glass-panel p-12 text-center border-white/5">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                                <Zap size={20} className="text-slate-600" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No stations found</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                {debouncedSearchTerm || Object.values(debouncedFilters).some(f => f) 
                                    ? "Try adjusting your search or filters." 
                                    : "No charging stations are available at the moment."}
                            </p>
                            {(debouncedSearchTerm || Object.values(debouncedFilters).some(f => f)) && (
                                <button onClick={clearFilters} className="btn-secondary">
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <StationsList
                                stations={paginatedData.currentItems}
                                viewMode={viewMode}
                                handleSaveStation={handleSaveStation}
                                user={user}
                            />

                            <div className="flex justify-center pt-8">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={paginatedData.totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
