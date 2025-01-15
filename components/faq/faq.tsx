"use client";

import { useState } from "react";

export default function FAQPage() {
  
  const faqs = [
    {
      question: "What is this app for?",
      answer: "This app helps users manage toll payments for their vehicles and provides payment options.",
    },
    {
      question: "How do I add a vehicle?",
      answer: "Navigate to the 'Manage Vehicles' page, enter your vehicle’s license plate, and click 'Add Vehicle.'",
    },
    {
      question: "What payment methods are supported?",
      answer: "You can pay using your app balance or a linked card.",
    },
    {
      question: "Is my information secure?",
      answer: "Yes, we prioritize your privacy and use industry-standard security measures to protect your data.",
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center font-semibold text-gray-700 focus:outline-none"
              >
                {faq.question}
                <span className="ml-2 text-teal-500">{expandedIndex === index ? "-" : "+"}</span>
              </button>
              {expandedIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
