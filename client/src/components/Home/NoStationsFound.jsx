import { X } from "lucide-react";

const NoStationsFound = ({ setSearchTerm, setFilters, setShowFilters }) => (
    <div className="bg-white/80 rounded-xl border border-orange-100 p-8 text-center">
        <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <X className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1">
                No Stations Found
            </h3>
            <p className="text-gray-600 mb-4 max-w-md text-xs">
                We couldn't find any charging stations matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
                onClick={() => {
                    setSearchTerm("");
                    setFilters({
                        status: "",
                        connectorType: "",
                        minPower: "",
                        maxPower: "",
                    });
                    setShowFilters(false);
                }}
                className="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-xs font-medium"
            >
                Clear All Filters
            </button>
        </div>
    </div>
);

export default NoStationsFound;