import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => (
    <div className="mb-2 flex items-center justify-end gap-2">
        <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-1 rounded-full border bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40"
        >
            <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-2 text-xs text-gray-600">
            Page {currentPage} of {totalPages}
        </span>
        <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-1 rounded-full border bg-white shadow-sm hover:bg-gray-100 disabled:opacity-40"
        >
            <ChevronRight className="w-4 h-4" />
        </button>
    </div>
);

export default Pagination;