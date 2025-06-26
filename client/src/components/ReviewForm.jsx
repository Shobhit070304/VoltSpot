import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

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
      className="max-w-md p-4 rounded bg-gray-800 shadow mt-4"
    >
      <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <label className="block mb-1">Rating (1–5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border px-2 py-1 mb-3 bg-gray-800 rounded-md border-gray-600"
        required
      />

      <label className="block mb-1">Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border px-2 py-1 mb-3 bg-gray-800 rounded-md border-gray-600"
        rows={3}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;
