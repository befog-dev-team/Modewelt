"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ReportModal({ postId, jobId, isOpen, onClose }) {
  const { user } = useSession();

  const userId = user?.id;
  const [email, setEmail] = useState(user?.email);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setAltEmail(""); // Reset alternative email when reason changes
    setCustomReason(""); // Reset custom reason when selecting a new option
  };

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason.");
      return;
    }

    if (selectedReason === "Other" && (!customReason.trim() || !altEmail.trim())) {
      toast.error("Please provide all required details.");
      return;
    }

    setLoading(true);

    const reportData = {
      userId,
      reason: selectedReason,
      customReason: selectedReason === "Other" ? customReason : "",
      email,
      altEmail,
      postId,
      jobId,
    };

    try {
      console.log("Report Data:", reportData);
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        toast.success("Report submitted successfully!");
        setSelectedReason("");
        setCustomReason("");
        setAltEmail("");
        onClose();
      } else {
        toast.error("Failed to submit report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("An error occurred while submitting the report.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Select Reason</h2>
        <div className="space-y-3">
          {["False Information", "Harassment or Abuse", "Hate Speech", "Violence or Threats", "Spam or Scam", "Inappropriate Content", "Other"].map((reason) => (
            <label key={reason} className="flex items-center space-x-2">
              <input
                type="radio"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => handleReasonChange(reason)}
                className="form-radio h-4 w-4 text-[#f26744]"
              />
              <span className="text-gray-700">{reason}</span>
            </label>
          ))}

          {selectedReason && (
            <div className="space-y-2 mt-2">
              <input
                type="email"
                value={email}
                disabled
                className="w-full border px-2 py-1 rounded-md bg-gray-100 text-gray-500 hover:cursor-not-allowed"
              />
              <input
                type="email"
                placeholder="Enter alternative email (Optional)"
                prefix="Your Email: "
                value={altEmail}
                onChange={(e) => setAltEmail(e.target.value)}
                className="w-full border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26744]"
              />
              {selectedReason === "Other" && (
                <>
                  <textarea
                    placeholder="Type your reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full border px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26744]"
                    rows={3}
                  ></textarea>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f26744] hover:bg-[#e65a3a]"
              }`}
          >
            {loading ? (
              <Loader2 className="mx-auto animate-spin" />
            )
              : "Report"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
