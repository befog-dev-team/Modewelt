import { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (selectedReason === "Other" && !customReason.trim()) {
      alert("Please provide a reason for reporting.");
      return;
    }

    console.log("Report submitted:", selectedReason, customReason);
    setShowConfirmation(true); // Show confirmation modal instead of closing
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {showConfirmation ? (
          <ConfirmationModal onClose={onClose} />
        ) : (
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">Select Reason</h2>
            <div className="mt-4 space-y-3">
              {[
                "False Information",
                "Harassment or Abuse",
                "Hate Speech",
                "Violence or Threats",
                "Spam or Scam",
                "Inappropriate Content",
                "Other",
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="cursor-pointer"
                  />
                  <span>{reason}</span>
                </label>
              ))}

              {selectedReason === "Other" && (
                <input
                  type="text"
                  placeholder="Type your reason..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full border px-2 py-1 rounded-md mt-2"
                />
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#f26744] text-white rounded-lg"
              >
                Report
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
}

function ConfirmationModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl font-semibold text-center">Please Confirm your email</h2>
      <div className="mt-4 p-3 border rounded-md text-blue-600 text-center">
        xyz@gmail.com
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-200 text-green-800 border border-green-400 rounded-lg w-full"
        >
          Confirm Email
        </button>
      </div>
    </div>
  );
}
