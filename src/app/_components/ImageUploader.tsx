'use client'; // Ensure the component is client-side
import React, { useState } from 'react';

export default function ImageUploader(){
    const [description, setDescription] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchDescription = async () => {
      setLoading(true);
      setError(null);
      setDescription(null);
  
      try {
        // Call the API route we defined earlier to get the image description
        const response = await fetch('/api/uploadImage', { // Use absolute path
          method: 'POST',
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image and generate description.');
        }
  
        // Assuming the response has this shape: { description: string, error?: string }
        const data = await response.json();
  console.log('API response:', data); // Log the entire response object
  
  if (data) {
    // Set the description state to the response from the API
    setDescription(data.content);
  } else {
    console.error('No description received:', data); // Log the entire response for debugging
    throw new Error('No description received.');
  }
  
      } catch (error) {
        // Use appropriate error handling
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('An error occurred:', errorMessage);
        setError('Failed to upload image and generate description.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Image Description</h1>
        <button
          onClick={fetchDescription}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Loading...' : 'Get Image Description'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-semibold">Description:</h2>
            <p className='text-black'>{description}</p>
          </div>
        
      </div>
    );
  };


