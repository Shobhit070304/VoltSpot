import React, { useState } from "react";
import { Flag, Send, AlertCircle } from "lucide-react";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const ReportForm = ({ stationId, onSuccess }) => {
  const [issueType, setIssueType] = useState("Technical");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please describe the issue");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/report/create", {
        stationId,
        issueType,
        description,
      });
      if (response.status === 201) {
        toast.success("Report submitted successfully");
        onSuccess();
      }
    } catch (error) {
      toast.error("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-medium text-reflect-muted uppercase tracking-widest">
          Issue Type
        </label>
        <select
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="Technical" className="bg-midnight">Technical Issue</option>
          <option value="Maintenance" className="bg-midnight">Maintenance Required</option>
          <option value="Incorrect Info" className="bg-midnight">Incorrect Information</option>
          <option value="Other" className="bg-midnight">Other</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-medium text-reflect-muted uppercase tracking-widest">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please provide more details about the issue..."
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
            Submit Report
            <Flag size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ReportForm;
