import { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [altEmail, setAltEmail] = useState("");

  const handleReasonChange = (reason: string) => {
    setSelectedReason(reason);
    setAltEmail(""); // Reset alternative email when reason changes
  };

  const handleSubmit = () => {
    if (selectedReason === "Other" && (!customReason.trim() || !altEmail.trim())) {
      alert("Please provide all required details.");
      return;
    }
    
    console.log("Report submitted:", { selectedReason, customReason, email, altEmail });
    onClose(); // Close modal after submitting
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-semibold">Select Reason</h2>
          <div className="mt-4 space-y-3">
            {["False Information", "Harassment or Abuse", "Hate Speech", "Violence or Threats", "Spam or Scam", "Inappropriate Content", "Other"].map((reason) => (
              <label key={reason} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => handleReasonChange(reason)}
                  className="cursor-pointer"
                />
                <span>{reason}</span>
              </label>
            ))}

            {(selectedReason === "Other" || selectedReason) && (
              <div className="space-y-2 mt-2">
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full border px-2 py-1 rounded-md bg-gray-200"
                />
                <input
                  type="email"
                  placeholder="Enter alternative email..."
                  value={altEmail}
                  onChange={(e) => setAltEmail(e.target.value)}
                  className="w-full border px-2 py-1 rounded-md"
                />
                {selectedReason === "Other" && (
                  <input
                    type="text"
                    placeholder="Type your reason..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    className="w-full border px-2 py-1 rounded-md"
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-between">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-[#f26744] text-white rounded-lg">Report</button>
          </div>
        </div>
      </div>
    )
  );
}