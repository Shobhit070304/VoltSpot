import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";

const ReportForm = ({ stationId, showReviewForm, setShowReviewForm }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const res = await api.post(`/report/${stationId}`, {
        comment,
      });

      console.log("Response report", res);

      if (res.status === 200) {
        setShowReviewForm(!showReviewForm);
        toast.success("Report submitted successfully!");
        setComment("");
        setError("");
      } else {
        toast.error("Failed to submit report");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4  mt-4">
      <h3 className="text-lg font-semibold text-gray-300 mb-2">
        Report an issue
      </h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}

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

export default ReportForm;
