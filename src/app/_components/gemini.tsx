'use client';
import { useState, useEffect } from 'react';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import Markdown from 'react-markdown'
import { api } from 'note/trpc/react';

// Define a custom type for the response if the library does not provide one
type CustomGenerativeResponse = {
    response: {
        text: () => string;
    };
};

type GeminiProps = {
    topic: string; // Prop to specify the topic for content generation
};

export default function Gemini({ topic }: GeminiProps) {
    const initialMessage = "Welcome to the Nebula Finance Chat Bot. Using the power of AI I can answer any of your financial related questions.";
    const [result, setResult] = useState<string>(initialMessage);
    const [error, setError] = useState<string | null>(null);

    const utils = api.useUtils();
    const createPost = api.post.create.useMutation({
        onSuccess: async () => {
            await utils.post.getAllByChatId.invalidate();
        },
    });

    useEffect(() => {
        const API_KEY = "AIzaSyAfu-DOkl22wXJCrIn8ClfpJiWmWhqEba8";

        // Initialize the GoogleGenerativeAI instance
        const genAI = new GoogleGenerativeAI(API_KEY);

        // Async function to fetch generated content
        const generateContent = async () => {
            try {
                const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                // Use the passed prop `topic` for the prompt
                const prompt = `${topic}?`;

                // Fetching the content
                const response = await model.generateContent(prompt) as CustomGenerativeResponse;

                const generatedText: string = response.response.text();

                // Check if the generated text contains default or empty response
                const isDefaultResponse = generatedText.includes("Please provide me with more context") ||
                    generatedText.includes("Are you asking a question?") ||
                    generatedText.trim().length === 0;

                // Only update the result if the response is not default
                if (!isDefaultResponse) {
                    const formattedText = generatedText.replace(/\*\*\*\*/g, '•'); // Replace **** with bullet points
                    setResult(formattedText);
                } else {
                    setResult(initialMessage); // Reset to initial message if response is default
                }

            } catch (err) {
                setError("Failed to generate content");
                console.error("Error generating content:", err);
            }
        };

        generateContent().catch(err => {
            setError("Failed to generate content");
            console.error("Error generating content:", err);
        });
    }, [topic]); // Re-run the effect if the `topic` prop changes

    return (
        // <div className="p-5">
        //     <div className="text-lg md:text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-300 my-4 p-4 md:p-6 leading-[3] rounded-lg shadow-lg">
        //         {error ? <span>{error}</span> : <span>{result}</span>}
        //     </div>
        // </div>

        <div className="p-5">
            <div className="text-lg md:text-xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-300 my-4 p-4 md:p-6 leading-relaxed rounded-lg shadow-lg" style={{ lineHeight: '2.25rem' }}>
                
                    {error ? <span><Markdown>{error}</Markdown></span> : <span><Markdown>{result}</Markdown></span>}
                
            </div>
        </div>

    );
}
