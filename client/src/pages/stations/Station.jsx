import React, { useEffect, useState } from "react";
import {
  Zap,
  MapPin,
  Star,
  AlertCircle,
  Battery,
  CheckCircle,
  ChevronLeft,
  Clock,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Flag,
  Calculator,
  X,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../services/api";
import MapView from "../map/MapView";
import ReviewForm from "../../components/forms/ReviewForm";
import { useAuth } from "../../context/AuthContext";
import ReportForm from "../../components/forms/ReportForm";
import useRecentlyViewed from "../../hooks/useRecentlyViewed";
import AmenitiesCard from "../../components/cards/AmenitiesCard";
import CostEstimator from "../../components/cards/CostEstimator";
import LoadingSpinner from "../../components/fallback/LoadingSpinner";

function Station() {
  const { id } = useParams();
  const [station, setStation] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const { user } = useAuth();
  const { addStation } = useRecentlyViewed();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stationRes, reviewsRes] = await Promise.all([
          api.get(`/station/${id}`),
          api.get(`/review/${id}`)
        ]);

        if (stationRes.status === 200) {
          setStation(stationRes.data.station);
          addStation(stationRes.data.station);
        }
        if (reviewsRes.status === 200) {
          setReviews(reviewsRes.data);
        }
      } catch (error) {
        toast.error("Error loading station details");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !station) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center p-6">
        <div className="glass-panel p-8 max-w-md w-full text-center border-white/5">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">Error Loading Station</h3>
          <p className="text-xs text-slate-500 mb-6">Failed to load station data. Please try again later.</p>
          <Link to="/stations" className="btn-primary w-full inline-block text-[11px] font-bold uppercase tracking-widest py-3">
            Back to Stations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-white pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 animate-move-grid" />
      <div className="absolute inset-0 grid-dots opacity-40 animate-move-grid [animation-duration:10s]" />

      {/* Background Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-primary/5 blur-[120px] pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto">
        {/* Back Navigation */}
        <div className="mb-8 animate-fade-in">
          <Link
            to="/stations"
            className="inline-flex items-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors group"
          >
            <ChevronLeft className="h-3 w-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to network
          </Link>
        </div>

        {/* Station Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-slide-up">
          <div className="flex-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[9px] font-bold text-brand-primary mb-5 uppercase tracking-[0.3em]">
              <Sparkles className="h-2.5 w-2.5 mr-2" />
              Station Details
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-3">
              {station.name}
            </h1>
            <div className="flex items-center text-slate-400 text-[13px] font-medium">
              <MapPin size={14} className="mr-2 text-brand-primary" />
              {station.location}
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${station.status === "Active"
            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
            }`}>
            {station.status}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <InfoCard
                icon={<Battery size={14} className="text-brand-primary" />}
                label="Power"
                value={`${station.powerOutput} kW`}
              />
              <InfoCard
                icon={<Zap size={14} className="text-brand-secondary" />}
                label="Type"
                value={station.connectorType}
              />
              <InfoCard
                icon={<Clock size={14} className="text-emerald-400" />}
                label="Hours"
                value={station.availability || "24/7"}
              />
              <InfoCard
                icon={<Sparkles size={14} className="text-brand-accent" />}
                label="Price"
                value={`₹ ${station.price}/kWh`}
              />
            </div>

            {/* Map */}
            <div className="glass-panel overflow-hidden h-[350px] border-white/5 shadow-2xl">
              <MapView station={station} embedded={true} />
            </div>

            {/* Reviews Section */}
            <div className="glass-panel overflow-hidden border-white/5">
              <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-brand-primary" />
                  <h2 className="text-base font-bold tracking-tight text-white">Community Feedback</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={10}
                        className={`${star <= (station.averageRating || 0)
                          ? "text-brand-primary fill-brand-primary"
                          : "text-white/10"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] font-bold text-white">
                    {station.averageRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {review.user?.name?.charAt(0) || "A"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[11px] font-bold text-white tracking-tight">@{review.user?.name || "Anonymous"}</p>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-white/5 border border-white/10">
                              <Star size={8} className="text-brand-primary fill-brand-primary" />
                              <span className="text-[9px] font-bold text-slate-500">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-medium">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-[11px] text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login to write a review");
                      return;
                    }
                    setShowReviewForm(!showReviewForm);
                  }}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-2.5 !rounded-xl font-bold text-[10px] uppercase tracking-widest"
                >
                  <MessageSquare size={14} className="text-brand-primary" />
                  {user ? "Write a Review" : "Login to Write"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Actions Card */}
            <div className="glass-panel p-6 bg-brand-primary/[0.02] border-brand-primary/10 shadow-2xl">
              <h2 className="text-[9px] font-bold text-slate-500 mb-5 uppercase tracking-widest">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  disabled={station.status !== "Active"}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 !rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-brand-primary/20"
                >
                  <Zap size={16} />
                  Start Charging
                </button>
                <button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login to report an issue");
                      return;
                    }
                    setShowReportForm(!showReportForm);
                  }}
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-3 !rounded-xl font-bold text-[11px] uppercase tracking-widest"
                >
                  <Flag size={16} className="text-brand-secondary" />
                  Report Issue
                </button>
              </div>
            </div>

            {/* Amenities Card */}
            <AmenitiesCard amenities={station.amenities || []} />

            {/* Cost Estimator Card */}
            <div className="glass-panel p-6 border-white/5">
              <div className="flex items-center gap-2.5 mb-5">
                <Calculator size={16} className="text-brand-accent" />
                <h2 className="text-sm font-bold tracking-tight text-white">Cost Estimator</h2>
              </div>
              <CostEstimator station={station} />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showReviewForm && (
        <Modal title="Write a Review" onClose={() => setShowReviewForm(false)}>
          <ReviewForm
            stationId={id}
            onSuccess={(newReview) => {
              setReviews((prev) => [newReview, ...prev]);
              setShowReviewForm(false);
            }}
          />
        </Modal>
      )}

      {showReportForm && (
        <Modal title="Report an Issue" onClose={() => setShowReportForm(false)}>
          <ReportForm
            stationId={id}
            onSuccess={() => setShowReportForm(false)}
          />
        </Modal>
      )}
    </div>
  );
}

const InfoCard = ({ icon, label, value }) => (
  <div className="glass-panel p-3.5 flex items-center gap-3 hover:bg-white/[0.04] transition-all duration-300 border-white/5">
    <div className="p-2 rounded-xl bg-white/5">
      {icon}
    </div>
    <div>
      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-[13px] font-bold text-white tracking-tight">{value}</p>
    </div>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm" onClick={onClose} />
    <div className="relative w-full max-w-lg glass-panel p-6 animate-slide-up border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default Station;
