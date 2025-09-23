import React, { useEffect, useState } from "react";
import {
  Zap,
  MapPin,
  Star,
  Wifi,
  ShoppingBag,
  AlertCircle,
  Battery,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Coffee,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import DynamicMapView from "../map/DynamicMapView";
import DynamicReviewForm from "../../components/forms/DynamicReviewForm";
import { useAuth } from "../../context/AuthContext";
import DynamicReportForm from "../../components/forms/DynamicReportForm";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import AmenitiesCard from "../../components/cards/AmitiesCard";
import DynamicCostEstimator from "../../components/cards/DynamicCostEstimator";

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
  Maintenance: "bg-yellow-100 text-yellow-800",
};

function Station() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStation = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/station/${id}`);
        if (response.status === 200) {
          setStation(response.data.station);
        }
      } catch (error) {
        toast.error("Error fetching station");
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/review/${id}`);
        if (response.status === 200) {
          setReviews(response.data);
        }
      } catch (error) {
        toast.error("Failed to fetch reviews");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStation();
    fetchReviews();
  }, [id]);

  const { addStation } = useRecentlyViewed();
  useEffect(() => {
    if (station) {
      addStation(station);
    }
  }, [station]);

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
            Loading station details...
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
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Error Loading Station
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {error.message ||
                  "Failed to load station data. Please try again later."}
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[32rem] h-[32rem] bg-orange-200/30 rounded-full blur-[100px] opacity-50 animate-float"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-[80px] opacity-40 animate-float-delay"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            to="/stations"
            className="inline-flex items-center text-sm font-medium text-orange-700 hover:text-orange-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to all stations
          </Link>
        </div>

        {/* Station Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
          <div className="px-6 py-6 sm:px-8 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 p-4 rounded-lg border border-orange-200">
                <Zap className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-5">
                <h1 className="text-2xl font-bold text-gray-900">
                  {station?.name}
                </h1>
                <div className="mt-1 flex items-center text-sm text-gray-600">
                  <MapPin className="flex-shrink-0 mr-2 h-4 w-4 text-orange-500" />
                  {station?.location}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full ${
                  station?.status === "Active"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {station?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Station Information */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-orange-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Station Information
                </h2>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Power Output
                    </h3>
                    <div className="flex items-center text-lg font-semibold text-gray-900">
                      <Battery className="flex-shrink-0 mr-2 h-5 w-5 text-amber-500" />
                      {station?.powerOutput} kW
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Connector Type
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {station?.connectorType}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Availability
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {station?.availability || "24/7"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Price
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      ${station?.pricePerKwh}/kWh
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      Coordinates
                    </h3>
                    <p className="text-sm text-gray-600">
                      {station?.latitude?.toFixed(4)},{" "}
                      {station?.longitude?.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
              <DynamicMapView station={station} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-orange-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  Current Status
                </h2>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {station?.status === "Active" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">
                      This station is currently
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {station?.status === "Active"
                        ? "Available for charging"
                        : "Unavailable"}
                    </p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <button
                    type="button"
                    disabled={station?.status !== "Active"}
                    className={`w-full inline-flex justify-center items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      station?.status === "Active"
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md hover:shadow-orange-500/20"
                        : "bg-gray-100 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {station?.status === "Active"
                      ? "Start Charging Session"
                      : "Currently Unavailable"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!user) {
                        toast.error("Please login to report an issue");
                        return;
                      }
                      setShowReportForm(!showReportForm);
                    }}
                    className="w-full inline-flex justify-center items-center px-4 py-3 rounded-lg border border-orange-200 text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
                  >
                    {user ? "Report an Issue" : "Login to Report an Issue"}
                  </button>
                </div>
                {user && showReportForm && (
                  <DynamicReportForm
                    stationId={id}
                    showReportForm={showReportForm}
                    setShowReportForm={setShowReportForm}
                  />
                )}
              </div>
            </div>

            {/* Amenities */}
            <AmenitiesCard amenities={station?.amenities || []} />

            {/* Reviews */}
            <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-orange-100 shadow-md overflow-hidden">
              <div className="px-6 py-5 border-b border-orange-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  User Reviews
                </h2>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= (station?.averageRating || 0)
                            ? "text-amber-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {station?.averageRating?.toFixed(1) || "0.0"} (
                    {reviews?.length || 0} reviews)
                  </span>
                </div>

                <div className="mt-4 space-y-4 max-h-60 overflow-y-auto pr-2">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="pb-4 border-b border-orange-100 last:border-0 last:pb-0"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          @{review.user?.name || "Anonymous"}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No reviews yet</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login to write a review");
                      return;
                    }
                    setShowReviewForm(!showReviewForm);
                  }}
                  className="mt-4 w-full inline-flex justify-center items-center px-4 py-2.5 rounded-lg border border-orange-200 text-sm font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  {user ? "Write a Review" : "Login to Write a Review"}
                </button>
              </div>
            </div>

            {/* Cost & Time Estimate */}
            <DynamicCostEstimator station={station} />

            {user && showReviewForm && (
              <DynamicReviewForm
                stationId={id}
                showReviewForm={showReviewForm}
                setShowReviewForm={setShowReviewForm}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Station;
