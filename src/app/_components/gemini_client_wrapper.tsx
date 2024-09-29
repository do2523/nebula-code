'use client';
import React, { useState } from 'react';
import InputBox from './input'; // Adjust the path based on your folder structure
import Gemini from './gemini';
import { api } from 'note/trpc/react';

export default function ClientWrapper({ prompt }: { prompt: string }) {
  const [submittedValue, setSubmittedValue] = useState('');


  const handleValueSubmit = (value: string) => {
    setSubmittedValue(value);
  };

  return (
    <div className=''>
      <InputBox onSubmit={handleValueSubmit} />
      <Gemini topic={ prompt + submittedValue} />
    </div>
  );
}