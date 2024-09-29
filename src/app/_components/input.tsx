'use client';
import React, { useState } from 'react';

interface InputBoxProps {
  onSubmit: (value: string) => void;
}

export default function InputBox({ onSubmit }: InputBoxProps) {
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
      <div className='flex justify-center items-center pt-10'>
      <div className='flex justify-center items-center'>
        <input 
          className="w-[350px] px-4 py-3 bg-black text-white border-2 border-green-800 font-normal hover:bg-[#171D18] focus:outline-none focus:ring-green-400 focus:ring-opacity-75 h-12"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(keyDown) => {
            if (keyDown.key === "Enter") {
              handleSubmit();
            }
          }}
          type="text"
          placeholder="Ask AI about anything Finance..." 
        />
        <button 
          className="bg-green-700 hover:bg-blue-950 text-white font-bold py-3 px-4 h-12"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      </div>
    </>
  );
}
