import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-hot-toast";
import { AlertCircle, Send } from 'react-feather';

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
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-6 rounded-xl bg-gray-900/70 backdrop-blur-lg border border-gray-800/50 shadow-xl mt-6"
    >
      <h3 className="text-lg font-light tracking-wide text-white mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
        Report an Issue
      </h3>

      {error && (
        <div className="mb-4 p-3 text-xs font-light tracking-wide rounded-lg bg-red-900/30 text-red-300 border border-red-800/50">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-light tracking-wide text-gray-300 mb-2">
          Describe the issue:
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2.5 text-sm font-light tracking-wide bg-gray-900/50 rounded-lg border border-gray-800/50 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-200"
          rows={4}
          placeholder="Please provide details about the issue you're experiencing..."
          required
        />
      </div>

      <div className="flex justify-start space-x-3">
        <button
          type="button"
          // onClick={/* Add cancel handler if needed */}
          className="px-3 py-2 text-sm font-light rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-light rounded-lg text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-red-500/20 flex items-center"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit Report
        </button>
      </div>
    </form>
  );
};

export default ReportForm;
