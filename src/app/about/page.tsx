// ContactForm.tsx

import React from 'react';

export default function ContactForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-black text-2xl font-semibold mb-4 text-center">
          Contact Us
        </h2>
        <p className="text-black text-center mb-6">
         We Would Love To Make Your Experience Better!
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
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
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="position" className="block text-gray-700 font-medium mb-2">
              Select An Issue If You Had Any
            </label>
            <select
              id="position"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option className='text-black' value="">Select</option>
              <option className='text-black' value="position1">No Issues</option>
              <option className='text-black' value="position2">AI</option>
              <option className='text-black' value="position2">Dashboard</option>

            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
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
      </div>
      <div className="mt-8 text-center">
        <p className="text-white text-lg">
          Nebula Finance
        </p>
        <button className="mt-4 bg-white text-green-500 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
          ShellHacks
        </button>
      </div>
    </div>
  );
}
