import React, { useState } from "react";
import { Star, Send, AlertCircle } from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const ReviewForm = ({ stationId, onSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/review/create", {
        stationId,
        rating,
        comment,
      });
      if (response.status === 201) {
        toast.success("Review submitted successfully");
        onSuccess(response.data.review);
      }
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-medium text-reflect-muted uppercase tracking-widest">
          Your Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                size={28}
                className={`${star <= (hover || rating)
                  ? "text-blue-500 fill-blue-500"
                  : "text-white/10"
                  } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-reflect-muted uppercase tracking-widest">
          Your Experience
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about your charging experience..."
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-reflect-muted/30 focus:outline-none focus:border-blue-500 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Submit Review
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
