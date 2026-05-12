"use client";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is ModeweltJob.com?",
      answer:
        "ModeweltJob.com is a dedicated platform that consolidates all top fashion job listings in one place, saving professionals time and effort from searching across multiple websites.",
    },
    {
      question: "How does ModeweltJob.com help job seekers?",
      answer:
        "The platform provides direct access to leading fashion brands, including major fashion houses, startups, and established companies, making it easier to secure interviews and job offers.",
    },
    {
      question: "What types of job opportunities are available?",
      answer:
        "ModeweltJob.com offers both freelance and full-time job opportunities, catering to different career preferences.",
    },
    {
      question: "Does the platform provide job alerts?",
      answer:
        "Yes, job seekers receive real-time notifications about new job openings, exclusive internships, and the latest fashion industry trends.",
    },
    {
      question: "How does ModeweltJob.com improve the hiring process?",
      answer:
        "The platform speeds up recruitment by ensuring quick responses from employers, reducing long waiting times, and making hiring efficient.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-transparent">
      <div className="max-w-[1192px] w-full">
        <h2 className="text-2xl font-bold text-black">
          Frequently asked questions
        </h2>
        <div className="mt-4 border-t border-gray-300">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 bg-transparent"
            >
              <button
                className="w-full text-left py-4 px-4 flex justify-between items-center focus:outline-none"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <span className="text-lg font-semibold text-black">{faq.question}</span>
                <span className="text-black font-semibold text-lg">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="bg-[#E8E0E6] ml-4 px-4 pb-4 pt-2 transition-all duration-300 h-20 overflow-y-auto">
                  <p className="text-black">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
