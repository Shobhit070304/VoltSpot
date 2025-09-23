import { useState } from "react";
import { api } from "../../services/api";
import { toast } from "react-hot-toast";
import { Edit, Send, Star } from "react-feather";
import { X } from "lucide-react";

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

      if (res.status === 201) {
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
      className="max-w-md p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-orange-100 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Edit className="w-5 h-5 mr-2 text-amber-500" />
        Leave a Review
      </h3>

      {error && (
        <div className="mb-4 p-3 text-xs font-medium tracking-wide rounded-lg bg-red-100 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating:
        </label>
        <div className="flex items-center space-x-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${star <= rating ? "text-amber-500 fill-current" : "text-orange-200"}`}
              />
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full px-4 py-2.5 text-sm font-medium bg-white rounded-xl border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 text-gray-900 placeholder-orange-300 transition-all duration-200"
          required
          hidden
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comment:
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-3 text-sm font-medium bg-white rounded-xl border border-orange-200 focus:outline-none focus:ring-1 focus:ring-orange-300 focus:border-orange-300 text-gray-900 placeholder-orange-300 transition-all duration-200"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-start space-x-3">
        <button
          type="button"
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-4 py-2.5 text-sm font-medium rounded-xl border border-orange-200 text-orange-700 bg-orange-50 hover:bg-orange-100 transition-all duration-300 flex items-center"
        >
          <X className="w-4 h-4 mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-sm hover:shadow-orange-200 flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
