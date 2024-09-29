import React from 'react';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black py-12">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to our personal finance platform! We are dedicated to empowering individuals to take control of their financial lives. Our goal is to provide you with the knowledge, tools, and resources to make informed decisions about your money, so you can achieve financial independence and peace of mind.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Whether you're just starting to build your savings, looking to manage debt, or planning for the future, we're here to help. Our team of financial enthusiasts is passionate about simplifying complex financial concepts, making it easier for you to set and reach your financial goals.
        </p>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Join us in this journey to financial well-being. Explore our resources, learn at your own pace, and take actionable steps towards a secure financial future. If you have any questions or need personalized guidance, feel free to reach out to us. Together, we can make smart financial choices that lead to a brighter tomorrow.
        </p>
        <div className="flex justify-center mt-6">
          <p
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Contact Us
          </p>
        </div>
      </div>
    </div>
  );
}
