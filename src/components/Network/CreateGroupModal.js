"use client";
import Image from "next/image";
import React, { useState } from "react";

const CreateGroupModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [groupData, setGroupData] = useState({
    groupName: "",
    members: [],
    description: "",
    profilePic: null,
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrevious = () => setStep((prev) => prev - 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const newMember = e.target.member.value;
    if (newMember) {
      setGroupData((prev) => ({
        ...prev,
        members: [...prev.members, newMember],
      }));
      e.target.reset();
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupData((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Group Name:</label>
            <input
              type="text"
              name="groupName"
              value={groupData.groupName}
              onChange={handleInputChange}
              placeholder="Enter group name"
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Add Members:</label>
            <form onSubmit={handleAddMember} className="flex items-center gap-2">
              <input
                type="text"
                name="member"
                placeholder="Enter member's name"
                className="flex-grow p-2 border rounded"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#ad578e] text-white rounded"
              >
                Add
              </button>
            </form>
            <ul className="mt-2">
              {groupData.members.map((member, index) => (
                <li key={index} className="text-sm">
                  {index + 1}. {member}
                </li>
              ))}
            </ul>
          </div>
        );
      case 3:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Group Description:</label>
            <textarea
              name="description"
              value={groupData.description}
              onChange={handleInputChange}
              placeholder="Add a brief description of your group"
              className="w-full p-2 border rounded"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Upload Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full p-2 border rounded"
            />
            {groupData.profilePic && (
              <div className="mt-4 flex justify-center">
                <Image
                  width={100}
                  height={100}
                  src={groupData.profilePic}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-lg font-bold mb-2">Review Your Group</h3>
            <p>
              <strong>Group Name:</strong> {groupData.groupName}
            </p>
            <p>
              <strong>Members:</strong>{" "}
              {groupData.members.length > 0
                ? groupData.members.join(", ")
                : "No members added"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {groupData.description || "No description added"}
            </p>
            {groupData.profilePic && (
              <div className="mt-4 flex justify-center">
                <Image
                  width={100}
                  height={100}
                  src={groupData.profilePic}
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
              </div>
            )}
          </div>
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ×
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Create a Group</h2>
        {renderStepContent()}

        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
          )}
          {step < 5 && (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-[#ad578e] text-white rounded"
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
