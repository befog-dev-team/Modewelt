import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import proImg from "../../../../public/assets/profile/backgroundImageBackrgound.png"; // Import the image path

export default function Modal({ isOpen, closeModal }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [src, setSrc] = useState(proImg); // Set default image as the imported image URL

  const connections = [
    { name: "Aditya Kumar Kanaujia", role: "Job role" },
    { name: "Aditya Kumar Kanaujia", role: "Job role" },
    { name: "Aditya Kumar Kanaujia", role: "Job role" },
    { name: "Aditya Kumar Kanaujia", role: "Job role" },
    { name: "Aditya Kumar Kanaujia", role: "Job role" },
  ];

  const filteredConnections = connections.filter((connection) =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[817px] h-[571px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Close button */}
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-[#A45286]"
                  >
                    You Share Aditya&apos;s Post
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Search input */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search your connection to share"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
                  />
                </div>

                {/* Connections list */}
                <ul className="space-y-2 max-h-[350px] overflow-y-auto">
                  {filteredConnections.map((connection, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Profile Image */}
                        <Image
                          src={src} // Ensure `src` is a valid string path
                          alt="Profile"
                          width={40}
                          height={40}
                          className="rounded-full w-[36px] h-[36px]"
                          onError={() => setSrc(proImg)} // Use the fallback image if the image fails to load
                        />

                        {/* Name and Role */}
                        <div>
                          <p className="text-gray-900 font-medium">
                            {connection.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {connection.role}
                          </p>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <input type="checkbox" className="form-checkbox" />
                    </li>
                  ))}
                </ul>

                {/* Send button */}
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-[91px] h-[32px] text-white rounded-[4px] focus:outline-none focus:ring focus:ring-purple-300"
                    style={{
                      background:
                        "linear-gradient(180deg, #BA96AD 0%, #A45286 100%)",
                    }}
                  >
                    Send
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
