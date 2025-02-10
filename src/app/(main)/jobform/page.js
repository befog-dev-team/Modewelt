"use client";

import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
// import Navbar from "@/components/Navbar";
import { IoMdRefresh } from "react-icons/io";
import { FaPlus, FaTrash } from "react-icons/fa6";
// import { BellRing } from "lucide-react";
// import { CircleUser } from "lucide-react";
import Navbar from "@/components/Navbar";

function InputField({
  label,
  type,
  placeholder,
  required = false,
  value,
  onChange,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a35284]"
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SelectField({ label, options, required = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#a35284]"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function FileUpload({ label, description, accept }) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 border border-gray-300 rounded-lg p-6 text-center">
      <label
        htmlFor="fileUpload"
        className="text-lg font-medium text-[#a35284] cursor-pointer"
      >
        {label}
      </label>
      <input id="fileUpload" type="file" className="hidden" accept={accept} />
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default function Home() {
  const [captcha, setCaptcha] = useState("16LP3");
  const [inputCaptcha, setInputCaptcha] = useState("");

  const regenerateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newCaptcha = "";
    for (let i = 0; i < 5; i++) {
      newCaptcha += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptcha(newCaptcha);
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputCaptcha !== captcha) {
  //     alert("Captcha does not match. Please try again.");
  //     return;
  //   }
  //   alert("Form submitted successfully!");
  // };
  const [educationList, setEducationList] = useState([
    { id: 1, degree: "BSc Computer Science", institution: "GLA University" },
  ]);

  const [degree, setDegree] = useState(""); // For holding the degree value from input
  const [institution, setInstitution] = useState(""); // For holding the institution value from input

  // Function to handle adding new education
  const addEducation = () => {
    if (!degree || !institution) {
      alert("Please enter both degree and institution.");
      return;
    }

    // Create a new education entry with a unique id
    const newEducation = {
      id: Date.now(), // Timestamp-based id
      degree,
      institution,
    };

    // Update the education list with the new entry
    setEducationList((prevList) => [...prevList, newEducation]);

    // Reset the input fields after adding the new entry
    setDegree("");
    setInstitution("");
  };

  // Function to remove education entry by id
  const removeEducation = (id) => {
    setEducationList(educationList.filter((edu) => edu.id !== id));
  };


  const [experienceList, setExperienceList] = useState([
    { id: 1, role: "Software Developer", company: "Hindalco Industries" },
  ]);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const addExperience = () => {
    if (!role || !company) {
      alert("Please enter both role and company.");
      return;
    }

    const newExperience = {
      id: Date.now(),
      role,
      company,
    };

    setExperienceList([...experienceList, newExperience]);
    setRole(""); // Clear the input fields after adding
    setCompany("");
  };

  const removeExperience = (id) => {
    setExperienceList(experienceList.filter((exp) => exp.id !== id));
  };

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const maxSize = 10 * 1024 * 1024; // 10MB
    let errorMessage = null;

    const fileList = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > maxSize) {
        errorMessage = "File size exceeds 10MB";
        break;
      }
      fileList.push(selectedFiles[i]);
    }

    if (errorMessage) {
      setError(errorMessage);
    } else {
      setError(null);
      setFiles(fileList);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* New Navbar */}
      {/* <div>
        <nav className="w-full h-[90px] px-5 py-5 pl-[45px] flex justify-between left-px border-[1px] border-[#ECECEC] bg-[#FFFFFF]">
          <h1 className="max-w-[116px] h-[24.55px] font-bold font-bungee text-xl leading-[30px] text-[#A45286]">
            Modewelt
          </h1>
          <button className="max-w-[96px] h-[48px] flex items-center gap-6">
            <BellRing size={24} />
            <CircleUser className="w-[35px] h-[35px]" />
          </button>
        </nav>
      </div> */}

      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="bg-[#a35285] text-white">
        <div className="max-w-4xl mx-auto p-6 md:p-10">
          <h1 className="text-2xl font-bold">Fashion Designer</h1>
          <p className="text-sm">1 year | Kolkata, Pune | Full-Time</p>
        </div>
      </header>

      {/* Form Section */}
      <main className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10 mt-6">
        <form className="space-y-6" noValidate>
          {/* Upload Resume */}
          <FileUpload
            label="Upload Resume"
            description="Auto-fill fields below. Max file size: 10MB (Formats: .doc, .pdf, .docx, .rtf, .odt)."
            accept=".doc,.pdf,.docx,.rtf,.odt"
          />

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              required
            />
            <InputField
              label="Middle Name"
              type="text"
              placeholder="Enter your middle name"
            />
            <InputField
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Gender"
              options={["Male", "Female", "Other"]}
              required
            />
            <InputField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="w-1/2">
            <label className="text-gray-700 font-medium mb-1">
              Mobile Phone <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <select className="border p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-[#a35284]">
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+81">+81</option>
                <option value="+86">+86</option>
                <option value="+49">+49</option>
                <option value="+33">+33</option>
                <option value="+39">+39</option>
                <option value="+7">+7</option>
                <option value="+55">+55</option>
                <option value="+27">+27</option>
                <option value="+34">+34</option>
                <option value="+64">+64</option>
                <option value="+82">+82</option>
                <option value="+971">+971</option>
                <option value="+1-876">+1-876</option>
                <option value="+20">+20</option>
                <option value="+358">+358</option>
                <option value="+47">+47</option>
                <option value="+46">+46</option>
                <option value="+63">+63</option>
              </select>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="border p-2 flex-1 rounded-r focus:outline-none focus:ring-2 focus:ring-[#a35284]"
                required
              />
            </div>
          </div>

          {/* Additional Documents */}
          <div>
            <label className="text-gray-700 font-medium">
              Additional Documents
            </label>
            <div className="flex items-center mt-2">
              <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-sm text-gray-500">
                <CiCirclePlus className="text-3xl text-[#a35284]" />
                <span>Add Files</span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <p className="ml-4 text-xs text-gray-400">Max size: 10MB</p>
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-gray-700 font-medium">Selected Files:</h3>
                <ul className="list-disc ml-5">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Date of Birth and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Date of Birth" type="date" />
            <div className="grid grid-cols-2 gap-2">
              <InputField
                label="Experience (Years)"
                type="number"
                placeholder="Years"
              />
              <InputField
                label="Experience (Months)"
                type="number"
                placeholder="Months"
              />
            </div>
          </div>

          {/* Expected and Current Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Current Salary (INR)"
              type="text"
              placeholder="Enter current salary"
            />
            <InputField
              label="Expected Salary"
              type="text"
              placeholder="Enter expected salary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Available To Join (in days)"
              type="text"
              placeholder="Enter current salary"
            />
            <SelectField
              label="Preferred Location"
              options={["Male", "Female", "Other"]}
              required
            />
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Preferred Location"
              type="text"
              placeholder="Enter preferred location"
            />
            <InputField
              label="Notes"
              type="text"
              placeholder="Add any additional notes"
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Old Eduction"
              type="text"
              placeholder="Enter preferred location"
            />
            <InputField
              label="Old Candidate Created Date"
              type="text"
              placeholder="Add any additional notes"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Old Language"
              type="text"
              placeholder="Enter preferred location"
            />
          </div>
          <InputField
            label="Skills"
            type="text"
            placeholder="Enter preferred location"
          />

          <p className="text-sm text-gray-500">
            By applying, you accept our
            <a href="#" className="text-[#a35284] underline">
              Privacy Policy
            </a>
            .
          </p>
          {/* Experience Details */}
          <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-gray-800 font-medium text-sm md:text-base lg:text-lg mb-2 md:mb-3">
              Experience Details
            </h3>

            {/* Dynamic List of Experience */}
            <ul className="space-y-2">
              {experienceList.map((exp) => (
                <li
                  key={exp.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {exp.role}
                    </p>
                    <p className="text-xs text-gray-600">{exp.company}</p>
                  </div>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>

            {/* Input Fields for Adding New Experience */}
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Enter Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Enter Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Button to Add Experience */}
            <button
              onClick={addExperience}
              className="mt-3 flex items-center gap-2 text-[#a35284] text-sm font-medium hover:text-[#892d6b] transition-all"
            >
              <FaPlus /> Add Experience Details
            </button>
          </div>

          {/* Education Details */}
          <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-gray-800 font-medium text-sm md:text-base lg:text-lg mb-2 md:mb-3">
              Education Details
            </h3>

            {/* Dynamic List of Education */}
            <ul className="space-y-2">
              {educationList.map((edu) => (
                <li
                  key={edu.id}
                  className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                  </div>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>

            {/* Input Fields for Adding New Education */}
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Enter Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Enter Institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Button to Add Education */}
            <button
              onClick={addEducation}
              className="mt-3 flex items-center gap-2 text-[#a35284] text-sm font-medium hover:text-[#892d6b] transition-all"
            >
              <FaPlus /> Add Education Details
            </button>
          </div>

          {/* Captcha */}
          <div className="flex items-center space-x-4 w-1/2">
            <div className="bg-gray-100 border rounded-md p-2 flex justify-center items-center text-lg font-semibold text-[#a35284] w-24">
              {captcha}
            </div>
            <button
              type="button"
              className="text-[#a35284] text-sm font-medium hover:underline"
              onClick={regenerateCaptcha}
            >
              <IoMdRefresh className="text-[2rem]" />
            </button>
            <input
              type="text"
              placeholder="Captcha"
              className="border rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#a35284]"
              value={inputCaptcha}
              onChange={(e) => setInputCaptcha(e.target.value)}
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms" className="mt-1" required />
            <label htmlFor="terms" className="text-gray-600 text-sm">
              By applying, you hereby accept the data processing terms under the
              <a
                href="#"
                className="text-[#a35284] underline hover:no-underline"
              >
                Privacy Policy
              </a>
              and give consent to processing of the data as part of this job
              application.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-1/4 bg-[#a35284] text-white py-2 px-4 rounded-md hover:bg-[#872466] transition"
          >
            Apply Now
          </button>
        </form>
      </main>
    </div>
  );
}
