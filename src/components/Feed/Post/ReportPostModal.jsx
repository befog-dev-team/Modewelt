"use client";
import { useState, useEffect } from "react";

export const ReportPostModal = ({ isOpen, onClose, onReport, postId, reasonsList }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setShowTextarea(reason === "Other");
  };

  const handleSubmit = () => {
    const finalReason = selectedReason === "Other" ? customReason : selectedReason;
    onReport(postId, finalReason);
    onClose();
  };


  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 max-w-[805px] w-full shadow-lg relative">
          <h2 className="text-lg font-semibold mb-4">Report Post</h2>
          <p className="text-sm text-gray-600 mb-3">Why are you reporting this post?</p>

          {/* Radio Button List */}
          <div className="space-y-3">
            {reasonsList.map((reason) => (
              <label key={reason.id} className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="reportReason"
                  value={reason.label}
                  className="mt-1"
                  onChange={() => handleReasonChange(reason.label)}
                />
                <div>
                  <p className="font-medium">{reason.label}</p>
                  {reason.description && <p className="text-sm text-gray-600">{reason.description}</p>}
                </div>
              </label>
            ))}
          </div>

          {/* Textarea for "Other" */}
          {showTextarea && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Write the Reason</label>
              <textarea
                className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter the reason here"
                rows="4"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`px-4 py-2 text-sm text-white rounded-lg ${
                selectedReason && (selectedReason !== "Other" || customReason)
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!selectedReason || (selectedReason === "Other" && !customReason)}
              onClick={handleSubmit}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    )
  );
};
