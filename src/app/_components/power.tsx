'use client';
import React, { useState } from 'react';
import MyComponent from './input'; // Adjust the path based on your folder structure
import Gemini from './gemini';

function ClientWrapper() {
  const [submittedValue, setSubmittedValue] = useState('');

  const handleValueSubmit = (value: string) => {
    setSubmittedValue(value);
  };

  return (
    <div>
      <MyComponent onSubmit={handleValueSubmit} />
      <DisplayComponent value={submittedValue} />
    </div>
  );
}

function DisplayComponent({ value }: { value: string }) {
  return (
    <div>
    <Gemini topic={value} />

    </div>
  );
}

export default ClientWrapper;
