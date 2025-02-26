import { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string; // Making email dynamic
}

export default function ReportModal({ isOpen, onClose, userEmail }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (selectedReason === "Other" && !customReason.trim()) {
      alert("Please provide a reason for reporting.");
      return;
    }

    console.log("Report submitted:", selectedReason, customReason);
    setShowConfirmation(true);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {showConfirmation ? (
          <ConfirmationModal email={userEmail} onClose={onClose} />
        ) : (
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
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
                <label key={reason} className="flex items-center space-x-2 cursor-pointer">
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
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-[#f26744] text-white rounded-lg hover:bg-[#d8563a] transition"
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

function ConfirmationModal({ email, onClose }: { email: string; onClose: () => void }) {
  return (
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
      <h2 className="text-xl font-semibold">Please Confirm your Email</h2>
      <div className="mt-4 p-3 border rounded-md text-blue-600 bg-gray-100">
        {email}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition w-1/2"
        >
          Cancel
        </button>
        <button
          onClick={() => alert("Email confirmed")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-1/2"
        >
          Confirm Email
        </button>
      </div>
    </div>
  );
}
