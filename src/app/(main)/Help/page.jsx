import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
import React from 'react';

const HelpCenter = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-purple-50 flex flex-col items-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-[#944377]">Modeweltjob Help Center</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Modeweltjob Help Center! We are dedicated to ensuring your experience on Modeweltjob is smooth and productive. Whether you’re a job seeker passionate about the fashion industry or an employer seeking creative talent, this guide will help you navigate the platform effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#944377]">For Job Seekers</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">1. Getting Started</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li><strong>Create Your Account:</strong>
            <ul className="list-disc pl-6">
              <li>Sign up with your email address.</li>
              <li>Verify your email to activate all features.</li>
            </ul>
          </li>
          <li><strong>Complete Your Profile:</strong>
            <ul className="list-disc pl-6">
              <li>Add a profile picture and a headline that showcases your expertise.</li>
              <li>Upload your updated resume in PDF or Word format.</li>
              <li>Highlight your skills, work experience, education, and portfolio.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">2. Finding Jobs</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li><strong>Search Tools:</strong> Use filters such as Job Type, Location, Experience Level, Salary Range, and Company Type to find relevant roles.</li>
          <li><strong>Save Jobs:</strong> Bookmark jobs of interest to apply later.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">3. Applying for Jobs</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li><strong>Tailored Applications:</strong>
            <ul className="list-disc pl-6">
              <li>Review job requirements carefully.</li>
              <li>Attach a customized cover letter and portfolio links to your application.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">4. Application Tracking</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Monitor your application status via the Application Tracker in your dashboard.</li>
          <li>Receive updates and interview invites through notifications.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">5. Showcase Your Expertise</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Enroll in skill certification courses available on Modeweltjob to make your profile stand out.</li>
          <li>Keep your profile updated to improve visibility to recruiters.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#944377]">For Employers</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">1. Setting Up Your Account</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li><strong>Sign Up:</strong> Register with your company email to access employer features.</li>
          <li>Verify your account and complete your company profile.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">2. Posting Jobs</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li><strong>Create Listings:</strong>
            <ul className="list-disc pl-6">
              <li>Add job details, skill requirements, and application instructions.</li>
              <li>Use Modeweltjob Smart Job Posting to reach the right talent.</li>
            </ul>
          </li>
          <li><strong>Premium Job Posting:</strong> Boost visibility with sponsored listings.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">3. Reviewing Applications</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Use the Applicant Dashboard to view and organize candidate profiles.</li>
          <li>Filter candidates based on skills, experience, and qualifications.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">4. Branding Opportunities</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Create a compelling company profile with photos, videos, and success stories.</li>
          <li>Showcase your work culture and attract top creative talent.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">5. Subscriptions and Add-Ons</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Explore premium features like analytics, targeted campaigns, and priority support.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#944377]">Common Questions (FAQs)</h2>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">Job Seekers</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>How can I make my profile more appealing?</li>
          <li>What file formats are supported for resumes and portfolios?</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-[#944377]">Employers</h3>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>How do I purchase a subscription?</li>
          <li>What is the difference between standard and sponsored job postings?</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#944377]">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          Still have questions? Reach out to our support team!
        </p>
        <p className="text-gray-600 mb-4">
          Email: <a href="mailto:contact.us@befog.in" className="text-[#944377] underline">contact.us@befog.in</a><br />
          Live Chat: Available 24/7 via your dashboard.
        </p>

        <p className="text-gray-600 mt-6">
          Thank you for choosing Modeweltjob—your ultimate platform for connecting the fashion industry’s talent and opportunities!
        </p>
      </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default HelpCenter;
