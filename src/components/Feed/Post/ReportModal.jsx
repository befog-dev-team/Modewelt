"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReportModal({ postId, jobId, isOpen, onClose }) {
  const { user } = useSession();

  const userId = user?.id;
  const [email, setEmail] = useState(user?.email);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    setAltEmail("");
    setCustomReason("");
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedReason) {
      toast.error("Please select a reason.");
      return;
    }

    if (selectedReason === "Other" && !customReason) {
      toast.error("Please provide a reason.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("reason", selectedReason);
    formData.append("customReason", selectedReason === "Other" ? customReason : "");
    formData.append("email", email);
    formData.append("altEmail", altEmail);
    formData.append("postId", postId);
    formData.append("jobId", jobId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Report submitted successfully!");
        setSelectedReason("");
        setCustomReason("");
        setAltEmail("");
        setFiles([]);
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
      <div className="bg-white p-6 rounded-lg w-[50vw] max-h-[97vh] overflow-y-auto no-scrollbar shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Report Post</h2>

        <div className="space-y-3">
          {["False Information", "Harassment or Abuse", "Hate Speech", "Violence or Threats", "Spam or Scam", "Inappropriate Content", "Other"].map((reason) => (
            <label key={reason} className="flex items-center space-x-2 cursor-pointer">
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
              <label className="text-sm text-gray-600">Your Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-500 hover:cursor-not-allowed"
              />

              <label className="text-sm text-gray-600">Alternative Email (Optional)</label>
              <input
                type="email"
                placeholder="Enter alternative email"
                value={altEmail}
                onChange={(e) => setAltEmail(e.target.value)}
                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26744]"
              />

              {selectedReason === "Other" && (
                <>
                  <label className="text-sm text-gray-600 flex items-center gap-2">
                    Supporting Files (Optional) <UploadCloud className="h-4 w-4 text-gray-500" />
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26744]"
                    accept=".txt,.pdf,.jpg,.jpeg,.png,.gif,.mp3,.mp4"
                  />

                  {files.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                      <ul className="mt-1 space-y-1">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-1 rounded-md">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                              <X className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <label className="text-sm text-gray-600">Reason</label>
                  <textarea
                    placeholder="Type your reason"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f26744]"
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
            ) : (
              "Report"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
