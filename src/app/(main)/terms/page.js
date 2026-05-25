import React from 'react';
import Navbar from "../../../components/Navbar";
// import Footer from "../../../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#F9F6EE] flex flex-col items-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4 text-[#fc3fb4]">Privacy Policy for Modeweltjob</h1>
          <p className="text-gray-600 mb-4">
            Modeweltjob We are committed to protecting your privacy. This Privacy Policy outlines the types of personal information we collect, how we use it, with whom we share it, and the choices available to you regarding your information. By using the Modeweltjob platform (the “Platform”), you agree to the terms outlined in this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">1. Information We Collect</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-[#fc3fb4]">a. Information You Provide to Us:</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Account Information: Name, email address, phone number, and password when you create an account.</li>
            <li>Profile Information: Job preferences, skills, resume/CV, portfolio links, education, work experience, and other details you provide in your profile.</li>
            <li>Communication Information: Messages, inquiries, or feedback sent through our Platform.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-[#fc3fb4]">b. Automatically Collected Information:</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Device Information: IP address, device type, operating system, and browser type.</li>
            <li>Usage Data: Interactions with our Platform, such as pages visited, features used, and time spent on the Platform.</li>
            <li>Cookies and Similar Technologies: Information collected through cookies, web beacons, and similar tracking tools.</li>
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-[#fc3fb4]">c. Information from Third Parties:</h3>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li>Social Media Login Information: If you sign up using social media accounts, we collect information from your public profile, such as your name and email address.</li>
            <li>Employer and Recruiter Information: Information provided by employers or recruiters about job postings and candidate preferences.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li><strong>Platform Functionality:</strong> To create and manage your account, facilitate job matching and applications, and provide personalized job recommendations.</li>
            <li><strong>Communication:</strong> To respond to inquiries, feedback, and support requests, and to send updates about job postings, applications, or Platform changes.</li>
            <li><strong>Improvement and Development:</strong> To analyze usage patterns and improve Platform functionality, and to develop new features and services.</li>
            <li><strong>Legal Compliance:</strong> To comply with legal obligations, resolve disputes, and enforce our terms of service.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">3. Sharing Your Information</h2>
          <p className="text-gray-600 mb-4">
            We do not sell your personal information. However, we may share your information in the following ways:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li><strong>With Employers and Recruiters:</strong> Your profile and application details are shared with employers and recruiters as part of the job application process.</li>
            <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist in providing services such as hosting, analytics, payment processing, and email delivery.</li>
            <li><strong>Legal and Regulatory Authorities:</strong> We may disclose information if required by law or to protect our legal rights.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of our business, your information may be transferred to the new entity.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">4. Your Choices and Rights</h2>
          <ul className="list-disc pl-6 text-gray-600 mb-4">
            <li><strong>Managing Your Information:</strong> Update or delete your profile information directly through your account settings.</li>
            <li><strong>Communication Preferences:</strong> Opt-out of promotional emails by clicking the “unsubscribe” link.</li>
            <li><strong>Data Access and Deletion:</strong> Request access to, or deletion of, your personal information by contacting us at support@modewelt.com.</li>
            <li><strong>Cookie Management:</strong> Adjust your browser settings to manage or disable cookies.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">5. Data Retention</h2>
          <p className="text-gray-600 mb-4">
            We retain your information as long as your account is active or as necessary to fulfill the purposes outlined in this Privacy Policy. If you wish to delete your account, we will delete or anonymize your information, except where retention is required for legal purposes.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">6. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or misuse. However, no method of transmission over the internet or electronic storage is 100% secure. Use the Platform at your own risk.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">7. International Data Transfers</h2>
          <p className="text-gray-600 mb-4">
            If you are accessing the Platform from outside the United States, your information may be transferred to and processed in a country with different data protection laws. By using the Platform, you consent to such transfers.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">8. Third-Party Links</h2>
          <p className="text-gray-600 mb-4">
            Our Platform may contain links to third-party websites. We are not responsible for their privacy practices. Review the privacy policies of any third-party websites you visit.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">9. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy periodically. Changes will be effective upon posting to the Platform. We encourage you to review this Privacy Policy regularly.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2 text-[#fc3fb4]">10. Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions or concerns about this Privacy Policy, contact us at:
          </p>
          <p className="text-gray-600 mb-4">
            Email: <a href="mailto:contact.us@befog.in" className="text-[#fc3fb4] underline">contact.us@befog.in</a><br />
          </p>

          <p className="text-gray-600 mt-6">
            By using Modeweltjob, you acknowledge that you have read, understood, and agree to this Privacy Policy.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy;
