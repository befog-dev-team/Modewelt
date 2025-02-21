// Popup.jsx
import React from 'react';

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter event name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
