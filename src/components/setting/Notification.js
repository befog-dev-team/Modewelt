"use client"
import React from "react";

const Security = () => {
    return (
              <div className="flex items-center justify-center mb-24 space-y-8 mx-auto pt-4">
                <div className="max-w-[716px] w-full mx-auto bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[1.3rem] font-semibold text-gray-800">
                        Notifications you receive
                      </h2>
                      <ul className="mt-3 space-y-2">
                        <li className="flex justify-between items-cen ter p-2">
                          <span>Searching for a job</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Connecting with others</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Posting and commenting</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Messaging</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Groups</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Pages</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                        <li className="flex justify-between items-center p-2">
                          <span>Updating your profile</span>
                          <button className="text-blue-600 text-sm sm:text-base">
                            →
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          
    );
}
export default Security;