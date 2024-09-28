'use client';
import React, { useState } from 'react';
import Gemini from './gemini';

interface MyComponentProps {
  onSubmit: (value: string) => void;
}

function MyComponent({ onSubmit }: MyComponentProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue); // Pass the input value to the parent or store it
    setInputValue(''); // Optional: Clear input field after submission
  };

  return (
    <>
    <div className='flex justify-center items-center pt-30'>
    <div className='flex justify-center items-center pt-40'>
      <input className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75" type="text" value={inputValue} onChange={handleChange} />
      <button className="bg-green-700 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
    </>
  );
}

export default MyComponent;
