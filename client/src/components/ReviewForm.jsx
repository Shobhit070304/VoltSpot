import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { Edit, Send } from "lucide-react";

const ReviewForm = ({ stationId, showReviewForm, setShowReviewForm }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }
    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const res = await api.post(`/review/${stationId}`, {
        rating,
        comment,
      });

      if (res.status === 200) {
        setShowReviewForm(!showReviewForm);
        toast.success("Review submitted successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Something went wrong");
    } finally {
      setRating(5);
      setComment("");
      setError("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 rounded-xl bg-gray-900/70 backdrop-blur-lg border border-gray-800/50 shadow-xl mt-6"
    >
      <h3 className="text-lg font-light tracking-wide text-white mb-4 flex items-center">
        <Edit className="w-5 h-5 mr-2 text-indigo-400" />
        Leave a Review
      </h3>

      {error && (
        <div className="mb-4 p-3 text-xs font-light tracking-wide rounded-lg bg-red-900/30 text-red-300 border border-red-800/50">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-light tracking-wide text-gray-300 mb-2">
          Rating (1–5):
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-4 py-2.5 text-sm font-light tracking-wide bg-gray-900/50 rounded-lg border border-gray-800/50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-200"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-light tracking-wide text-gray-300 mb-2">
          Comment:
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2.5 text-sm font-light tracking-wide bg-gray-900/50 rounded-lg border border-gray-800/50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-200"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2.5 text-sm font-light tracking-wide rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
