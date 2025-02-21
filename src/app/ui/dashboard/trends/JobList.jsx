import React from "react";

const JobList = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {["bg-blue-100", "bg-red-100", "bg-yellow-100 border-2 border-purple-400 p-2"]
        .map((bgColor, index) => (
          <div
            key={index}
            className={`flex items-center justify-between w-full max-w-4xl p-4 rounded-lg shadow-lg bg-white`}
          >
            <div className="flex items-center space-x-4">
              <span className={`w-10 h-10 rounded-lg ${bgColor}`}></span>
              <div>
                <p className="font-semibold text-[#242424]">Company</p>
                <p className="text-sm text-gray-500">Date</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#242424]">Job</p>
              <p className="text-sm text-blue-500">Openings</p>
            </div>
            <div>
              <p className="font-semibold text-[#242424]">Description</p>
              <p className="text-sm text-gray-500">Lorem tgexz dfvibn....</p>
            </div>
            <div>
              <p className="font-semibold text-[#242424]">Applicants</p>
              <p className="text-sm text-gray-500">23538</p>
            </div>
            <a href="#" className="text-blue-600 font-semibold">View Details</a>
          </div>
        ))}
    </div>
  );
};

export default JobList;
