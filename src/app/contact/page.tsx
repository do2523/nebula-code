"use client"; 

import React, { useState } from "react";

export default function ContactForm() {

  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 

    // Reset submission status
    setSubmissionStatus({ success: null, message: "" });

    // Use event.currentTarget to get the form element
    const formData = new FormData(event.currentTarget);

    // Append the access key to the form data
    formData.append("access_key", "bedb4d5a-a2f1-4512-87d3-d3d5ce2bf431");

    // Convert formData to an object and then to a JSON string
    const object = Object.fromEntries(formData.entries()); // Make sure to use .entries()
    const json = JSON.stringify(object);

    try {
      // Send the form data to the server
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!response.ok) {
        // Handle non-200 responses
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();
      if (result.success) {
        // Log success and show success message
        setSubmissionStatus({ success: true, message: "Form submitted successfully!" });
        event.currentTarget.reset(); // Reset the form fields
      } else {
        // Log failure and show failure message
        setSubmissionStatus({ success: false, message: "Form submission failed. Please try again." });
        event.currentTarget.reset(); // Reset the form fields

      }
    } catch (error) {
      // Log errors and show error message
      setSubmissionStatus({ success: false, message: "Form Submitted!" });
    }
  }

  return (
    <div className="text-black min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-black text-2xl font-semibold mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-black text-center mb-6">
          We Would Love To Make Your Experience Better!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Your email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="AnyIssue" className="block text-gray-700 font-medium mb-2">
              Select An Issue If You Had Any
            </label>
            <select
              name="AnyIssue"
              id="AnyIssue"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option className="text-black" value="">
                Select
              </option>
              <option className="text-black" value="AnyIssue1">
                No Issues
              </option>
              <option className="text-black" value="AnyIssue2">
                AI
              </option>
              <option className="text-black" value="AnyIssue3">
                Dashboard
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                required
              />
              <span className="ml-2 text-gray-700">I am not a robot</span>
            </label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Display the submission status message */}
        {submissionStatus.success !== null && (
          <div
            className={`mt-6 text-center p-4 rounded-lg ${
              submissionStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {submissionStatus.message}
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <p className="text-white text-lg">Nebula Finance</p>
        <button className="mt-4 bg-white text-green-500 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
          ShellHacks
        </button>
      </div>
    </div>
  );
}
