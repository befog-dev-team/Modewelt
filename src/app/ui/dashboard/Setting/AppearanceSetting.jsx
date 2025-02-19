"use client"; 
import { useState } from "react"; 
import { FaRegCalendarAlt } from "react-icons/fa";  

const AppearanceSettings = () => {
  const [backupEmail, setBackupEmail] = useState("");
  const [exportEmail, setExportEmail] = useState("");
  const [accountDeletion, setAccountDeletion] = useState("");

  const handleSaveChanges = () => {
    // Implement save changes logic here
    console.log("Save changes triggered");
  };

  return (
    <div className="max-w-[1014px] bg-white rounded-lg p-6">
      <h2 className="text-lg font-semibold text-[#000000] mb-4">
        Appearance Setting
      </h2>

      {/* Data backup */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label htmlFor="backupEmail" className="block text-[#4a4a4a] mb-1">
            Data backup
          </label>
          <input
            id="backupEmail"
            type="email"
            className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
            placeholder="Enter Backup email"
            value={backupEmail}
            onChange={(e) => setBackupEmail(e.target.value)}
          />
        </div>
        <button className="mt-6 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Start backup
        </button>
      </div>

      {/* Export data */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label htmlFor="exportEmail" className="block text-[#4a4a4a] mb-1">
            Export data
          </label>
          <input
            id="exportEmail"
            type="email"
            className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
            placeholder="Enter email"
            value={exportEmail}
            onChange={(e) => setExportEmail(e.target.value)}
          />
        </div>
        <button className="mt-6 px-12 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Export
        </button>
      </div>

      {/* Account Deletion */}
      <div className="mb-4">
        <label htmlFor="accountDeletion" className="block text-[#4a4a4a] mb-1">
          Delete Account
        </label>
        <textarea
          id="accountDeletion"
          className="w-full p-2 text-[#4a4a4a] border rounded-md bg-gray-100"
          placeholder="Enter email"
          value={accountDeletion}
          onChange={(e) => setAccountDeletion(e.target.value)}
        />
      </div>

      {/* Delete button */}
      <div className="flex">
        <button className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition">
          Delete
        </button>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          aria-rowspan={2}
          className="mt-4 px-6 py-2 border border-[#a65386] text-[#a65386] rounded-lg hover:bg-[#a65386] hover:text-white transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
